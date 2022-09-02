import type { Bot } from "../../../bot.ts";
import { DiscordListArchivedThreads } from "../../../types/discord.ts";
import { Collection } from "../../../util/collection.ts";
import { ActiveThreads } from "./getActiveThreads.ts";

/** Get the public archived threads for this channel */
export async function getPublicArchivedThreads(
  bot: Bot,
  channelId: bigint,
  options?: ListArchivedThreads,
): Promise<ArchivedThreads> {
  const results = await bot.rest.runMethod<DiscordListArchivedThreads>(
    bot.rest,
    "GET",
    bot.constants.routes.THREAD_ARCHIVED_PUBLIC(channelId, options),
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

/** https://discord.com/developers/docs/resources/channel#list-public-archived-threads-query-string-params */
export interface ListArchivedThreads {
  /** Returns threads before this timestamp */
  before?: number;
  /** Optional maximum number of threads to return */
  limit?: number;
}

export type ArchivedThreads = ActiveThreads & {
  hasMore: boolean;
};
