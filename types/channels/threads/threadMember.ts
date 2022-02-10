export interface ThreadMemberBase {
  /** Any user-thread settings, currently only used for notifications */
  flags: number;
}

export interface ThreadMemberOnGuildCreate extends ThreadMemberBase {
  /** The time the current user last joined the thread */
  joinTimestamp: string;
}

export interface ThreadMember extends ThreadMemberBase {
  /** The id of the thread */
  id?: string;
  /** The id of the user */
  userId?: string;
  /** The time the current user last joined the thread */
  joinTimestamp: string;
}

export interface ThreadMemberModified extends ThreadMemberBase {
  /** The id of the thread */
  id: bigint;
  /** The id of the user */
  userId: bigint;
  /** The time the current user last joined the thread */
  joinTimestamp: number;
}
