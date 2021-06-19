import { editThread } from "./edit_thread.ts";

/** Sets a thread channel to be locked. */
export function lockThread(threadId: bigint) {
  return editThread(threadId, { locked: true });
}
