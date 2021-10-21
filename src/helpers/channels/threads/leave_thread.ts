import type { Bot } from "../../../bot.ts";

/** Removes the bot from a thread. Requires the thread is not archived. */
export async function leaveThread(bot: Bot, threadId: bigint) {
  const thread = await bot.cache.threads.get(threadId);
  if (thread?.archived) throw new Error(bot.constants.Errors.CANNOT_LEAVE_ARCHIVED_THREAD);

  return await bot.rest.runMethod<undefined>(bot.rest,"delete", bot.constants.endpoints.THREAD_ME(threadId));
}
