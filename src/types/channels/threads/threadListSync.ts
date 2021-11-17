import { Channel } from "../channel.ts";
import { ThreadMember } from "./threadMember.ts";

// TODO: add docs link
export interface ThreadListSync {
  /** The id of the guild */
  guildId: string;
  /** The parent channel ids whose threads are being synced. If omitted, then threads were synced for the entire guild. This array may contain channelIds that have no active threads as well, so you know to clear that data */
  channelIds?: string[];
  // TODO: check if need to omit
  /** All active threads in the given channels that the current user can access */
  threads: Channel[];
  /** All thread member objects from the synced threads for the current user, indicating which threads the current user has been added to */
  members: ThreadMember[];
}
