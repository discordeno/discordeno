import { Channel } from "../channel.ts";
import { ThreadMember } from "./threadMember.ts";

// TODO: add docs link
export interface ListActiveThreads {
  /** The active threads */
  threads: Channel[];
  /** A thread member object for each returned thread the current user has joined */
  members: ThreadMember[];
}
