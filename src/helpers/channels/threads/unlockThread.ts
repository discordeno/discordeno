import type { Bot } from "../../../bot.ts";

/** Sets a thread channel to be unlocked. */
export async function unlockThread(bot: Bot, threadId: bigint) {
  return await bot.helpers.editThread(threadId, { locked: false });
}
