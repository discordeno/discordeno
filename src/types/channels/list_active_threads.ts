import { ThreadMember } from "../messages/thread_member.ts";
import { Channel } from "./channel.ts";

export interface ListActiveThreads {
  /** The active threads */
  threads: Channel[];
  /** A thread member object for each returned thread the current user has joined */
  members: ThreadMember[];
  /** Whether there are potentially additional threads that could be returned on subsequent call */
  hasMore: boolean;
}
