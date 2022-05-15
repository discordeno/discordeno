import type { Bot } from "../../../bot.ts";
import { DiscordListThreads } from "../../../types/discord.ts";
import { Collection } from "../../../util/collection.ts";

/** Returns all active threads in the guild, including public and private threads. Threads are ordered by their `id`, in descending order. */
export async function getActiveThreads(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<DiscordListThreads>(
    bot.rest,
    "get",
    bot.constants.endpoints.THREAD_ACTIVE(guildId),
  );

  return bot.transformers.listThreads(bot, result);
}
