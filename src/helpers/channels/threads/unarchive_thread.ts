import type { Bot } from "../../../bot.ts";

/** Sets a thread channel to be unarchived. */
export async function unarchiveThread(bot: Bot, threadId: bigint) {
  return await bot.helpers.editThread(bot, threadId, { archived: false });
}
