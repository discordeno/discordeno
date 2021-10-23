import type { Bot } from "../../../bot.ts";

/** Sets a thread channel to be locked. */
export async function lockThread(bot: Bot, threadId: bigint) {
  return await bot.utils.editThread(bot, threadId, { locked: true });
}
