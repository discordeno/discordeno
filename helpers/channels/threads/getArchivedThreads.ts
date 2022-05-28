import { Collection } from "../../../util/collection.ts";
import type { Bot } from "../../../bot.ts";
import { DiscordListThreads } from "../../../types/discord.ts";

/** Get the archived threads for this channel, defaults to public */
export async function getArchivedThreads(
  bot: Bot,
  channelId: bigint,
  options?: ListArchivedThreads & {
    type?: "public" | "private" | "privateJoinedThreads";
  },
) {
  let url = options?.type === "privateJoinedThreads"
    ? bot.constants.routes.THREAD_ARCHIVED_PRIVATE_JOINED(channelId, options)
    : options?.type === "private"
    ? bot.constants.routes.THREAD_ARCHIVED_PRIVATE(channelId, options)
    : bot.constants.routes.THREAD_ARCHIVED_PUBLIC(channelId, options);

    if (options.before) url += `before=${new Date(options.before).toISOString()}`;
    if (options.limit) url += `&limit=${options.limit}`;
  }
  const result = (await bot.rest.runMethod<DiscordListThreads>(
    bot.rest,
    "GET",
    url,
  ));

  return bot.transformers.listThreads(bot, result);
}

/** https://discord.com/developers/docs/resources/channel#list-public-archived-threads-query-string-params */
export interface ListArchivedThreads {
  /** Returns threads before this timestamp */
  before?: number;
  /** Optional maximum number of threads to return */
  limit?: number;
}
