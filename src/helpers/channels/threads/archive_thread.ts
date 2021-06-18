import { editThread } from "./edit_thread.ts";

/** Sets a thread channel to be archived. */
export function archiveThread(threadId: bigint) {
  return editThread(threadId, { archived: true });
}
