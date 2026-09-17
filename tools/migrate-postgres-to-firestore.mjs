import process from 'node:process';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import pg from 'pg';

const write = process.argv.includes('--write');
const overwrite = process.argv.includes('--overwrite');
if (overwrite && !write) throw new Error('--overwrite requires --write');
if (!process.env.DATABASE_URL || !process.env.FIREBASE_PROJECT_ID) throw new Error('DATABASE_URL and FIREBASE_PROJECT_ID are required');

if (!getApps().length) initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID });
const firestore = getFirestore();
const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
const { rows: polls } = await client.query('SELECT * FROM polls ORDER BY id');

for (const legacy of polls) {
  const id = String(legacy.id);
  const pollRef = firestore.doc(`polls/${id}`);
  const existing = await pollRef.get();
  if (existing.exists && !overwrite) throw new Error(`poll ${id} already exists (use --write --overwrite after backup)`);
  const { rows: responses } = await client.query('SELECT * FROM poll_responses WHERE poll_id = $1 ORDER BY id', [legacy.id]);
  const type = legacy.type || 'standard';
  console.log(`${write ? 'Migrating' : 'Would migrate'} poll ${id}: ${responses.length} response(s)`);
  if (!write) continue;

  const batch = firestore.batch();
  batch.set(pollRef, {
    question: legacy.question, type, createdAt: Timestamp.fromDate(legacy.created_at),
    // Historical creator/session identity cannot be recovered.
    createdBy: 'legacy-migration', limitVotes: type === 'video_collab' ? true : Boolean(legacy.limit_votes),
    submissionClosesAt: legacy.submission_close_at ? Timestamp.fromDate(legacy.submission_close_at) : null,
    votingClosesAt: legacy.expires_at ? Timestamp.fromDate(legacy.expires_at) : null,
  });
  for (const response of responses) {
    const path = type === 'video_collab'
      ? `polls/${id}/submissions/legacy-${response.id}`
      : `polls/${id}/options/${response.id}`;
    batch.set(firestore.doc(path), type === 'video_collab'
      ? { videoId: response.video_id, title: response.text.slice(0, 256), votes: response.votes, submittedAt: Timestamp.fromDate(response.created_at) }
      : { text: response.text.slice(0, 256), votes: response.votes });
  }
  await batch.commit();
}
await client.end();
console.log(write ? 'Migration complete.' : 'Dry run complete. Re-run with --write to migrate.');
