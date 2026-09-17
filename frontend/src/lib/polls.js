import {
  Timestamp, collection, doc, getDoc, increment, onSnapshot, query,
  serverTimestamp, writeBatch
} from 'firebase/firestore';
import { auth, db, ensureSignedIn } from './firebase';

const MAX_DURATION_HOURS = 8760;

function closeAt(hours) {
  if (!hours) return null;
  return Timestamp.fromMillis(Date.now() + Number(hours) * 60 * 60 * 1000);
}

function pollFromSnapshot(snapshot) {
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

export async function createPoll({ question, type, options = [], limitVotes = false, submissionDurationHours, votingDurationHours }) {
  const user = await ensureSignedIn();
  const now = serverTimestamp();
  const pollRef = doc(collection(db, 'polls'));
  const batch = writeBatch(db);
  const votingClosesAt = closeAt(votingDurationHours);
  const poll = {
    question: question.trim(), type, createdAt: now, createdBy: user.uid,
    limitVotes: type === 'video_collab' ? true : Boolean(limitVotes),
    submissionCount: 0,
    submissionClosesAt: type === 'video_collab' ? closeAt(submissionDurationHours) : null,
    votingClosesAt,
  };
  batch.set(pollRef, poll);
  if (type === 'standard') {
    options.forEach((text) => {
      const optionRef = doc(collection(pollRef, 'options'));
      batch.set(optionRef, { text: text.trim(), votes: 0 });
    });
  }
  await batch.commit();
  return pollRef.id;
}

export async function getPoll(pollId) {
  await ensureSignedIn();
  return pollFromSnapshot(await getDoc(doc(db, 'polls', pollId)));
}

export function subscribePoll(pollId, callback, onError) {
  return onSnapshot(doc(db, 'polls', pollId), (snapshot) => callback(pollFromSnapshot(snapshot)), onError);
}

export function subscribeChoices(pollId, choiceCollection, callback, onError) {
  return onSnapshot(query(collection(db, 'polls', pollId, choiceCollection)), (snapshot) => {
    callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
  }, onError);
}

export async function getOwnSubmission(pollId) {
  const user = await ensureSignedIn();
  const snapshot = await getDoc(doc(db, 'polls', pollId, 'submissions', user.uid));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

export async function hasVoted(pollId) {
  const user = await ensureSignedIn();
  return (await getDoc(doc(db, 'polls', pollId, 'votes', user.uid))).exists();
}

export async function submitVideo(pollId, videoId, title) {
  const user = await ensureSignedIn();
  const batch = writeBatch(db);
  batch.set(doc(db, 'polls', pollId, 'submissions', user.uid), {
      videoId, title: title.slice(0, 256), votes: 0, submittedAt: serverTimestamp()
    });
  batch.update(doc(db, 'polls', pollId), { submissionCount: increment(1) });
  await batch.commit();
}

export async function castVote(pollId, choiceCollection, choiceId) {
  const user = await ensureSignedIn();
  const pollRef = doc(db, 'polls', pollId);
  const choiceRef = doc(db, 'polls', pollId, choiceCollection, choiceId);
  const voteRef = doc(db, 'polls', pollId, 'votes', user.uid);
  const batch = writeBatch(db);
  batch.update(choiceRef, { votes: increment(1) });
  batch.set(voteRef, { choiceId, choiceCollection, votedAt: serverTimestamp() });
  await batch.commit();
}

export function phaseFor(poll, now = Date.now()) {
  if (!poll) return 'closed';
  const submissionEnd = poll.submissionClosesAt && poll.submissionClosesAt.toMillis();
  const votingEnd = poll.votingClosesAt && poll.votingClosesAt.toMillis();
  if (poll.type === 'video_collab' && submissionEnd && now < submissionEnd) return 'submission';
  if (votingEnd && now >= votingEnd) return 'closed';
  return 'voting';
}

export { MAX_DURATION_HOURS };
