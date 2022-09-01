import type { Bot } from "../../../bot.ts";
import { DiscordListArchivedThreads } from "../../../types/discord.ts";
import { Collection } from "../../../util/collection.ts";
import { ActiveThreads } from "./getActiveThreads.ts";

export type ArchivedThreads = ActiveThreads & {
  hasMore: boolean;
};

/** Get the archived threads for this channel, defaults to public */
export async function getArchivedThreads(
  bot: Bot,
  channelId: bigint,
  options?: ListArchivedThreads & {
    type?: "public" | "private" | "privateJoinedThreads";
  },
): Promise<ArchivedThreads> {
  const url = options?.type === "privateJoinedThreads"
    ? bot.constants.routes.THREAD_ARCHIVED_PRIVATE_JOINED(channelId, options)
    : options?.type === "private"
    ? bot.constants.routes.THREAD_ARCHIVED_PRIVATE(channelId, options)
    : bot.constants.routes.THREAD_ARCHIVED_PUBLIC(channelId, options);

  const results = await bot.rest.runMethod<DiscordListArchivedThreads>(
    bot.rest,
    "GET",
    url,
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
