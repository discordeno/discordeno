import { editThread } from "./edit_thread.ts";

/** Sets a thread channel to be unarchived. */
export function unarchiveThread(threadId: bigint) {
  return editThread(threadId, { archived: false });
}
