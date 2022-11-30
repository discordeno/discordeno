import type { Bot } from "../../../bot.ts";
import { BigString, Channel, ThreadMember } from "../../../mod.ts";
import { DiscordListActiveThreads } from "../../../types/discord.ts";
import { Collection } from "../../../util/collection.ts";

/**
 * Gets the list of all active threads for a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the threads of.
 * @returns An instance of {@link ActiveThreads}.
 *
 * @remarks
 * Returns both public and private threads.
 *
 * Threads are ordered by the `id` property in descending order.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#list-active-guild-threads}
 */
export async function getActiveThreads(bot: Bot, guildId: BigString): Promise<ActiveThreads> {
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
