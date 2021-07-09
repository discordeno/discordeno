import { editThread } from "./edit_thread.ts";

/** Sets a thread channel to be locked. */
export async function lockThread(threadId: bigint) {
  return await editThread(threadId, { locked: true });
}
