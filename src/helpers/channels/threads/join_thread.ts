import type { Bot } from "../../../bot.ts";

/** Adds the bot to the thread. Cannot join an archived thread. */
export async function joinThread(bot: Bot, threadId: bigint) {
  // const thread = await bot.cache.threads.get(threadId);
  // if (thread?.archived) {
  //   throw new Error(bot.constants.Errors.CANNOT_ADD_USER_TO_ARCHIVED_THREADS);
  // }

  // return await bot.rest.runMethod<undefined>(bot.rest, "put", bot.constants.endpoints.THREAD_ME(threadId));
}
