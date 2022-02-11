import { ListActiveThreads } from "../../../types/channels/threads/listActiveThreads.ts";
import { ListPublicArchivedThreads } from "../../../types/channels/threads/listPublicArchivedThreads.ts";
import { Collection } from "../../../util/collection.ts";
import type { Bot } from "../../../bot.ts";

/** Get the archived threads for this channel, defaults to public */
export async function getArchivedThreads(
  bot: Bot,
  channelId: bigint,
  options?: ListPublicArchivedThreads & {
    type?: "public" | "private" | "privateJoinedThreads";
  },
) {
  const result = (await bot.rest.runMethod<ListActiveThreads>(
    bot.rest,
    "get",
    options?.type === "privateJoinedThreads"
      ? bot.constants.endpoints.THREAD_ARCHIVED_PRIVATE_JOINED(channelId)
      : options?.type === "private"
      ? bot.constants.endpoints.THREAD_ARCHIVED_PRIVATE(channelId)
      : bot.constants.endpoints.THREAD_ARCHIVED_PUBLIC(channelId),
    options
      ? {
        before: options.before,
        limit: options.limit,
        type: options.type,
      }
      : {},
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
