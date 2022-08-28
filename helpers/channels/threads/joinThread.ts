import type { Bot } from "../../../bot.ts";

/** Adds the bot to the thread. Cannot join an archived thread. */
export async function joinThread(bot: Bot, threadId: bigint): Promise<void> {
  return await bot.rest.runMethod<void>(bot.rest, "PUT", bot.constants.routes.THREAD_ME(threadId));
}
