import type { Bot } from "../../../bot.ts";
import { DiscordListArchivedThreads } from "../../../types/discord.ts";
import { BigString } from "../../../types/shared.ts";
import { Collection } from "../../../util/collection.ts";
import { ArchivedThreads, ListArchivedThreads } from "./getPublicArchivedThreads.ts";

/**
 * Gets the list of private archived threads for a channel.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel to get the archived threads for.
 * @param options - The parameters for the fetching of threads.
 * @returns An instance of {@link ArchivedThreads}.
 *
 * @remarks
 * Requires the `READ_MESSAGE_HISTORY` permission.
 * Requires the `MANAGE_THREADS` permission.
 *
 * Returns threads of type {@link ChannelTypes.GuildPrivateThread}.
 *
 * Threads are ordered by the `archive_timestamp` property included in the metadata of the object in descending order.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#list-private-archived-threads}
 */
export async function getPrivateArchivedThreads(
  bot: Bot,
  channelId: BigString,
  options?: ListArchivedThreads,
): Promise<ArchivedThreads> {
  const results = await bot.rest.runMethod<DiscordListArchivedThreads>(
    bot.rest,
    "GET",
    bot.constants.routes.THREAD_ARCHIVED_PRIVATE(channelId, options),
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
    hasMore: results.has_more,
  };
}
