import type { Bot } from "../../../bot.ts";
import { ThreadMember } from "../../../transformers/threadMember.ts";
import { DiscordThreadMember } from "../../../types/discord.ts";

/** Returns thread members objects that are members of the thread. */
export async function getThreadMember(bot: Bot, threadId: bigint, userId: bigint): Promise<ThreadMember> {
  const result = await bot.rest.runMethod<DiscordThreadMember>(
    bot.rest,
    "GET",
    bot.constants.routes.THREAD_USER(threadId, userId),
  );

  return bot.transformers.threadMember(bot, result);
}
