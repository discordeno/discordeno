export interface ThreadMember {
  /** The id of the thread */
  id?: string;
  /** The id of the user */
  userId?: string;
  /** The time the current user last joined the thread */
  joinTimestamp: string;
  /** Any user-thread settings, currently only used for notifications */
  flags: number;
}
