import { editThread } from "./edit_thread.ts";

/** Sets a thread channel to be unarchived. */
export async function unarchiveThread(threadId: bigint) {
  return await editThread(threadId, { archived: false });
}
