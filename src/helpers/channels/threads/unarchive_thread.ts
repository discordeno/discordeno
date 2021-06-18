import { editChannel } from "../edit_channel.ts";

/** Sets a thread channel to be unarchived. */
export function unarchiveThread(threadId: bigint) {
  return editChannel(threadId, { archived: false });
}
