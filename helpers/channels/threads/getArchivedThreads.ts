import { Collection } from "../../../util/collection.ts";
import type { Bot } from "../../../bot.ts";
import { DiscordListArchivedThreads } from "../../../types/discord.ts";

/** Get the archived threads for this channel, defaults to public */
export async function getArchivedThreads(
  bot: Bot,
  channelId: bigint,
  options?: ListArchivedThreads & {
    type?: "public" | "private" | "privateJoinedThreads";
  },
) {
  let url = options?.type === "privateJoinedThreads"
    ? bot.constants.endpoints.THREAD_ARCHIVED_PRIVATE_JOINED(channelId)
    : options?.type === "private"
    ? bot.constants.endpoints.THREAD_ARCHIVED_PRIVATE(channelId)
    : bot.constants.endpoints.THREAD_ARCHIVED_PUBLIC(channelId);
  if (options) {
    url += "?";

    if (options.before) url += `before=${new Date(options.before).toISOString()}`;
    if (options.limit) url += `&limit=${options.limit}`;
  }
  const result = (await bot.rest.runMethod<DiscordListArchivedThreads>(
    bot.rest,
    "GET",
    url,
  ));
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
