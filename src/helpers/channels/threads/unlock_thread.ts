import { editThread } from "./edit_thread.ts";

/** Sets a thread channel to be unlocked. */
export function unlockThread(threadId: bigint) {
  return editThread(threadId, { locked: false });
}
