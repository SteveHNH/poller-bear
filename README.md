# Poller Bear

Poller Bear is a static Svelte application deployed on Firebase Hosting. Polls,
votes, and collaborative video submissions live in Cloud Firestore; Firebase
Anonymous Authentication supplies the browser identity used for one vote and,
for collaborative polls, one submission.

## Local development

1. Create a Firebase project on the Spark plan, enable **Anonymous** sign-in and
   create a Firestore database. No Cloud Functions or billable Google Cloud
   service is required.
2. Copy `frontend/.env.example` to `frontend/.env` and fill in the public Web
   app configuration from Firebase Console. These identifiers are intentionally
   public; do not put service-account credentials in this file.
3. Run `cd frontend && npm install && npm run build`.
4. Run `cd frontend && npm run test:rules` to start Auth/Firestore emulators and
   execute the Rules tests. Use `npx firebase emulators:start --only auth,firestore,hosting`
   for interactive local development.

Deploy with `cd frontend && npm run build && npx firebase deploy --only hosting,firestore`.
Run `npx firebase use --add` first; `.firebaserc` is deliberately not committed
because project identifiers are deployment-specific. Configure a custom domain
in Firebase Hosting after deployment. Spark-plan quotas and product limits are
listed in the Firebase Console and should be reviewed before public launch.

Firebase Hosting rewrites every path to `index.html`, preserving `/polls/{id}`
and `/polls/{id}/r` links. The migration utility retains old numeric PostgreSQL
IDs as Firestore document IDs.

## Security model

Rules require authentication for every read/write. Anonymous identity means
"one vote per browser identity", not one vote per human: clearing site data or
using another browser creates another identity. Vote writes are batches that
create `/votes/{uid}` and increment exactly its selected choice. Rules reject
direct totals changes, multiple choice increments, duplicate vote markers, and
private collaborative-submission reads before voting opens.

Collaborative polls always limit votes, and allow a submitter to vote for their
own video (the pre-existing product decision).

Firestore Rules cannot count sibling documents in a batch. The UI enforces the
2–10 option requirement for standard polls, while Rules validate each initial
option and prevent later additions. A hostile creator can therefore create a
malformed poll with fewer options, but cannot affect another poll’s choices,
votes, or submissions. This is the intentional no-server/Spark-plan tradeoff.

## Migrating existing PostgreSQL data

The legacy Go/PostgreSQL source remains in this branch only until a production
migration has been confirmed. Existing cookie vote records cannot map to new
anonymous Firebase UIDs, so aggregate totals and links are preserved but old
one-vote markers are not.

`tools/migrate-postgres-to-firestore.mjs` is a dry run by default. It reads the
legacy `polls` and `poll_responses` tables, reports its intended writes, and
uses numeric poll IDs. Install its isolated dependencies with `cd tools && npm
install`, then provide `DATABASE_URL`, `GOOGLE_APPLICATION_CREDENTIALS`, and
`FIREBASE_PROJECT_ID`. Use `--write` to perform the migration; use `--overwrite`
only after taking a backup. Never commit a service-account key or database dump.
