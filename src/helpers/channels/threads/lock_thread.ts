import { editChannel } from "../edit_channel.ts";

/** Sets a thread channel to be locked. */
export function lockThread(threadId: bigint) {
  return editChannel(threadId, { locked: true });
}
