import { editThread } from "./edit_thread.ts";

/** Sets a thread channel to be unlocked. */
export async function unlockThread(threadId: bigint) {
  return await editThread(threadId, { locked: false });
}
