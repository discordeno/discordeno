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

  const result = await bot.rest.runMethod<DiscordListArchivedThreads>(
    bot.rest,
    "GET",
    url,
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
        return [member.id!, member];
      }),
    ),
    hasMore: result.has_more,
  };
}

/** https://discord.com/developers/docs/resources/channel#list-public-archived-threads-query-string-params */
export interface ListArchivedThreads {
  /** Returns threads before this timestamp */
  before?: number;
  /** Optional maximum number of threads to return */
  limit?: number;
}
