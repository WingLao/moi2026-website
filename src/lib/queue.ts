import { Queue } from 'bullmq';

let submissionQueue: Queue | null = null;

export function getSubmissionQueue() {
  if (!submissionQueue) {
    submissionQueue = new Queue('submission-judge', {
      connection: { url: process.env.REDIS_URL || 'redis://localhost:6379' },
    });
  }

  return submissionQueue;
}
