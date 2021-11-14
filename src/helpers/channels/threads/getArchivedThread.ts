import { ListActiveThreads } from "../../../types/channels/threads/list_active_threads.ts";
import { ListPublicArchivedThreads } from "../../../types/channels/threads/list_public_archived_threads.ts";
import { PermissionStrings } from "../../../types/permissions/permission_strings.ts";
import { Collection } from "../../../util/collection.ts";
import type { Bot } from "../../../bot.ts";
// import { channelToThread } from "../../../util/transformers/channel_to_thread.ts";

/** Get the archived threads for this channel, defaults to public */
export async function getArchivedThreads(
  bot: Bot,
  channelId: bigint,
  options?: ListPublicArchivedThreads & {
    type?: "public" | "private" | "privateJoinedThreads";
  }
) {
  // const permissions = new Set<PermissionStrings>(["READ_MESSAGE_HISTORY"]);
  // if (options?.type === "private") permissions.add("MANAGE_THREADS");
  // // TODO: pagination
  // const result = (await bot.rest.runMethod(
  //   bot.rest,
  //   "get",
  //   options?.type === "privateJoinedThreads"
  //     ? bot.constants.endpoints.THREAD_ARCHIVED_PRIVATE_JOINED(channelId)
  //     : options?.type === "private"
  //     ? bot.constants.endpoints.THREAD_ARCHIVED_PRIVATE(channelId)
  //     : bot.constants.endpoints.THREAD_ARCHIVED_PUBLIC(channelId),
  //   options
  //     ? {
  //         before: options.before,
  //         limit: options.limit,
  //         type: options.type,
  //       }
  //     : {}
  // )) as ListActiveThreads;
  // const threads = new Collection(
  //   result.threads.map((t) => {
  //     const ddThread = channelToThread(t);
  //     return [ddThread.id, ddThread];
  //   })
  // );
  // for (const member of result.members) {
  //   const thread = threads.get(bot.transformers.snowflake(member.id!));
  //   thread?.members.set(bot.transformers.snowflake(member.userId!), {
  //     userId: bot.transformers.snowflake(member.userId!),
  //     flags: member.flags,
  //     joinTimestamp: Date.parse(member.joinTimestamp),
  //   });
  // }
  // return threads;
}
