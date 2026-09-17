import { readFileSync } from 'node:fs';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { Timestamp, collection, doc, getDoc, getDocs, increment, serverTimestamp, setDoc, updateDoc, writeBatch } from 'firebase/firestore';

let environment;
const projectId = 'poller-bear-rules';
const future = () => Timestamp.fromMillis(Date.now() + 60 * 60 * 1000);
const past = () => Timestamp.fromMillis(Date.now() - 60 * 60 * 1000);
const db = (uid) => environment.authenticatedContext(uid).firestore();
const pollRef = (database, id) => doc(database, 'polls', id);

async function seed({ id = 'standard', type = 'standard', submissionClosesAt = null, votingClosesAt = future() } = {}) {
  await environment.withSecurityRulesDisabled(async (context) => {
    const database = context.firestore();
    await setDoc(pollRef(database, id), {
      question: 'Pick one', type, createdAt: Timestamp.now(), createdBy: 'owner', limitVotes: type === 'video_collab', submissionClosesAt, votingClosesAt,
    });
    if (type === 'standard') {
      await setDoc(doc(database, 'polls', id, 'options', 'one'), { text: 'One', votes: 0 });
      await setDoc(doc(database, 'polls', id, 'options', 'two'), { text: 'Two', votes: 0 });
    }
  });
}

beforeAll(async () => {
  environment = await initializeTestEnvironment({
    projectId,
    firestore: { rules: readFileSync('../firestore.rules', 'utf8'), host: '127.0.0.1', port: 8081 },
  });
});
afterEach(() => environment?.clearFirestore());
afterAll(() => environment?.cleanup());

describe('Firestore rules', () => {
  it('allows a valid standard poll and its initial options in one batch', async () => {
    const database = db('creator');
    const poll = pollRef(database, 'new-poll');
    const batch = writeBatch(database);
    batch.set(poll, { question: 'Best bear?', type: 'standard', createdAt: serverTimestamp(), createdBy: 'creator', limitVotes: false, submissionClosesAt: null, votingClosesAt: null });
    batch.set(doc(poll, 'options', 'a'), { text: 'Black bear', votes: 0 });
    batch.set(doc(poll, 'options', 'b'), { text: 'Polar bear', votes: 0 });
    await assertSucceeds(batch.commit());
  });

  it('hides collaborative submissions from other users until voting', async () => {
    await seed({ id: 'private', type: 'video_collab', submissionClosesAt: future() });
    await environment.withSecurityRulesDisabled(async (context) => setDoc(doc(context.firestore(), 'polls', 'private', 'submissions', 'author'), { videoId: 'dQw4w9WgXcQ', title: 'Video', votes: 0, submittedAt: Timestamp.now() }));
    await assertSucceeds(getDoc(doc(db('author'), 'polls', 'private', 'submissions', 'author')));
    await assertFails(getDoc(doc(db('visitor'), 'polls', 'private', 'submissions', 'author')));
    await assertFails(getDocs(collection(db('visitor'), 'polls', 'private', 'submissions')));
  });

  it('allows all authenticated users to read submissions once voting opens', async () => {
    await seed({ id: 'open', type: 'video_collab', submissionClosesAt: past() });
    await environment.withSecurityRulesDisabled(async (context) => setDoc(doc(context.firestore(), 'polls', 'open', 'submissions', 'author'), { videoId: 'dQw4w9WgXcQ', title: 'Video', votes: 0, submittedAt: Timestamp.now() }));
    await assertSucceeds(getDocs(collection(db('visitor'), 'polls', 'open', 'submissions')));
  });

  it('permits one atomic vote but rejects a second vote by the same UID', async () => {
    await seed();
    const database = db('voter');
    const vote = async (choiceId) => {
      const batch = writeBatch(database);
      batch.update(doc(database, 'polls', 'standard', 'options', choiceId), { votes: increment(1) });
      batch.set(doc(database, 'polls', 'standard', 'votes', 'voter'), { choiceId, choiceCollection: 'options', votedAt: serverTimestamp() });
      return batch.commit();
    };
    await assertSucceeds(vote('one'));
    await assertFails(vote('two'));
  });

  it('rejects direct vote total changes and a marker that increments multiple choices', async () => {
    await seed();
    const database = db('attacker');
    await assertFails(updateDoc(doc(database, 'polls', 'standard', 'options', 'one'), { votes: 9 }));
    const batch = writeBatch(database);
    batch.update(doc(database, 'polls', 'standard', 'options', 'one'), { votes: increment(1) });
    batch.update(doc(database, 'polls', 'standard', 'options', 'two'), { votes: increment(1) });
    batch.set(doc(database, 'polls', 'standard', 'votes', 'attacker'), { choiceId: 'one', choiceCollection: 'options', votedAt: serverTimestamp() });
    await assertFails(batch.commit());
  });
});
