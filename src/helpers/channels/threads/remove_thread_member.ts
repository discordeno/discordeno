import type { Bot } from "../../../bot.ts";

/** Removes a user from a thread. Requires the MANAGE_THREADS permission or that you are the creator of the thread. Also requires the thread is not archived. */
export async function removeThreadMember(bot: Bot, threadId: bigint, userId: bigint) {
  return await bot.rest.runMethod<undefined>(bot.rest, "delete", bot.constants.endpoints.THREAD_USER(threadId, userId));
}
