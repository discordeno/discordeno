import type { Bot } from "../../../bot.ts";
import { DiscordListArchivedThreads } from "../../../types/discord.ts";
import { Collection } from "../../../util/collection.ts";
import { ArchivedThreads, ListArchivedThreads } from "./getPublicArchivedThreads.ts";

/** Get the private joined archived threads for this channel */
export async function getPrivateJoinedArchivedThreads(
  bot: Bot,
  channelId: bigint,
  options?: ListArchivedThreads,
): Promise<ArchivedThreads> {
  const results = await bot.rest.runMethod<DiscordListArchivedThreads>(
    bot.rest,
    "GET",
    bot.constants.routes.THREAD_ARCHIVED_PRIVATE_JOINED(channelId, options),
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
