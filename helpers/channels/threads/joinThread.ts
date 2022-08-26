import type { Bot } from "../../../bot.ts";

/** Adds the bot to the thread. Cannot join an archived thread. */
export async function joinThread(bot: Bot, threadId: bigint): Promise<void> {
  return void await bot.rest.runMethod(bot.rest, "PUT", bot.constants.routes.THREAD_ME(threadId));
}
