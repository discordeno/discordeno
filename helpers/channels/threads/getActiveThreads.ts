import type { Bot } from "../../../bot.ts";
import { DiscordListActiveThreads } from "../../../types/discord.ts";
import { Collection } from "../../../util/collection.ts";

/** Returns all active threads in the guild, including public and private threads. Threads are ordered by their `id`, in descending order. */
export async function getActiveThreads(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<DiscordListActiveThreads>(
    bot.rest,
    "get",
    bot.constants.routes.THREAD_ACTIVE(guildId),
  );

  return {
    threads: new Collection(
      result.threads.map((t) => {
        const thread = bot.transformers.channel(bot, { channel: t });
        return [thread.id, thread];
      }),
    ),
    members: new Collection(
      result.members.map((m) => {
        const member = bot.transformers.threadMember(bot, m);
        return [member.id, member];
      }),
    ),
  };
}
