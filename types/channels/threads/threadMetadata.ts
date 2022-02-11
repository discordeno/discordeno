export interface ThreadMetadata {
  /** Whether the thread is archived */
  archived: boolean;
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration: 60 | 1440 | 4320 | 10080;
  // TODO(threads): channel struct should convert this to a unixx
  /** Timestamp when the thread's archive status was last changed, used for calculating recent activity */
  archiveTimestamp: string;
  /** When a thread is locked, only users with `MANAGE_THREADS` can unarchive it */
  locked?: boolean;
  /** whether non-moderators can add other non-moderators to a thread; only available on private threads */
  invitable?: boolean;
  /** Timestamp when the thread was created; only populated for threads created after 2022-01-09 */
  createTimestamp: string;
}
