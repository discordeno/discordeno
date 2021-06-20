import { ThreadMember, ThreadMemberModified } from "./thread_member.ts";

export interface ThreadMembersUpdateBase {
  /** The approximate number of members in the thread, capped at 50 */
  memberCount: number;
}

// TODO: add docs link
export interface ThreadMembersUpdate extends ThreadMembersUpdateBase {
  /** The id of the thread */
  id: string;
  /** The id of the guild */
  guildId: string;
  /** The users who were added to the thread */
  addedMembers?: ThreadMember[];
  /** The id of the users who were removed from the thread */
  removedMemberIds?: string[];
}

export interface ThreadMembersUpdateModified extends ThreadMembersUpdateBase {
  /** The id of the thread */
  id: bigint;
  /** The id of the guild */
  guildId: bigint;
  /** The users who were added to the thread */
  addedMembers?: ThreadMemberModified[];
  /** The id of the users who were removed from the thread */
  removedMemberIds?: bigint[];
}
