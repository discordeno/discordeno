import { Collection } from "../../../util/collection.ts";
import type { Bot } from "../../../bot.ts";
import { DiscordListActiveThreads } from "../../../types/discord.ts";

/** Get the archived threads for this channel, defaults to public */
export async function getArchivedThreads(
  bot: Bot,
  channelId: bigint,
  options?: ListPublicArchivedThreads & {
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

    if (options.before) url += `before=${options.before}`;
    if (options.limit) url += `&limit=${options.limit}`;
    if (options.type) url += `&type=${options.type}`;
  }
  const result = (await bot.rest.runMethod<DiscordListActiveThreads>(
    bot.rest,
    "get",
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
  };
}

// TODO: add docs link
export interface ListPublicArchivedThreads {
  // TODO: convert unix to ISO9601 timestamp
  /** Returns threads before this timestamp. UNIX or ISO8601 timestamp */
  before?: number | string;
  /** Optional maximum number of threads to return */
  limit?: number;
}
