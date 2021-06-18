import { editChannel } from "../edit_channel.ts";

/** Sets a thread channel to be archived. */
export function archiveThread(threadId: bigint) {
  return editChannel(threadId, { archived: true });
}
