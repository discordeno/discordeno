import { editChannel } from "../edit_channel.ts";

/** Sets a thread channel to be unlocked. */
export function unlockThread(threadId: bigint) {
  return editChannel(threadId, { locked: false });
}