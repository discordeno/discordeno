import type { Bot } from "../../../bot.ts";

/** Adds the bot to the thread. Cannot join an archived thread. */
export async function joinThread(bot: Bot, threadId: bigint) {
  await bot.rest.runMethod<undefined>(bot.rest, "put", bot.constants.endpoints.THREAD_ME(threadId));
}
