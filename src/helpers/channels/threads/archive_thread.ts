import { editThread } from "./edit_thread.ts";

/** Sets a thread channel to be archived. */
export async function archiveThread(threadId: bigint) {
  return await editThread(threadId, { archived: true });
}
