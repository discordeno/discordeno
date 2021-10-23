import type { Bot } from "../../../bot.ts";

/** Sets a thread channel to be archived. */
export async function archiveThread(bot: Bot, threadId: bigint) {
  return await bot.helpers.editThread(bot, threadId, { archived: true });
}
