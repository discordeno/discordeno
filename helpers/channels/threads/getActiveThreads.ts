import type { Bot } from "../../../bot.ts";
import { Channel, ThreadMember } from "../../../mod.ts";
import { DiscordListActiveThreads } from "../../../types/discord.ts";
import { Collection } from "../../../util/collection.ts";

/** Returns all active threads in the guild, including public and private threads. Threads are ordered by their `id`, in descending order. */
export async function getActiveThreads(bot: Bot, guildId: bigint): Promise<ActiveThreads> {
  const results = await bot.rest.runMethod<DiscordListActiveThreads>(
    bot.rest,
    "GET",
    bot.constants.routes.THREAD_ACTIVE(guildId),
  );

  return {
    threads: new Collection(
      results.threads.map((result) => {
        const thread = bot.transformers.channel(bot, { channel: result });
        return [thread.id, thread];
      }),
    ),
    members: new Collection(
      results.members.map((result) => {
        const member = bot.transformers.threadMember(bot, result);
        return [member.id!, member];
      }),
    ),
  };
}

export type ActiveThreads = {
  threads: Collection<bigint, Channel>;
  members: Collection<bigint, ThreadMember>;
};
