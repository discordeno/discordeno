import type { Bot } from "../../../bot.ts";

/** Removes the bot from a thread. Requires the thread is not archived. */
export async function leaveThread(bot: Bot, threadId: bigint): Promise<void> {
  return void await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.THREAD_ME(threadId));
}
