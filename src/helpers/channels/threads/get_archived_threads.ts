import { rest } from "../../../rest/rest.ts";
import { ListActiveThreads } from "../../../types/channels/threads/list_active_threads.ts";
import { ListPublicArchivedThreads } from "../../../types/channels/threads/list_public_archived_threads.ts";
import { PermissionStrings } from "../../../types/permissions/permission_strings.ts";
import { snowflakeToBigint } from "../../../util/bigint.ts";
import { Collection } from "../../../util/collection.ts";
import { endpoints } from "../../../util/constants.ts";
import { requireBotChannelPermissions } from "../../../util/permissions.ts";
import { channelToThread } from "../../../util/transformers/channel_to_thread.ts";
import { snakelize } from "../../../util/utils.ts";

/** Get the archived threads for this channel, defaults to public */
export async function getArchivedThreads(
  channelId: bigint,
  options?: ListPublicArchivedThreads & {
    type?: "public" | "private" | "privateJoinedThreads";
  }
) {
  const permissions = new Set<PermissionStrings>(["READ_MESSAGE_HISTORY"]);
  if (options?.type === "private") permissions.add("MANAGE_THREADS");

  await requireBotChannelPermissions(channelId, [...permissions]);

  // TODO: pagination

  const result = (await rest.runMethod(
    "get",
    options?.type === "privateJoinedThreads"
      ? endpoints.THREAD_ARCHIVED_PRIVATE_JOINED(channelId)
      : options?.type === "private"
      ? endpoints.THREAD_ARCHIVED_PRIVATE(channelId)
      : endpoints.THREAD_ARCHIVED_PUBLIC(channelId),
    snakelize(options ?? {})
  )) as ListActiveThreads;

  const threads = new Collection(
    result.threads.map((t) => {
      const ddThread = channelToThread(t);
      return [ddThread.id, ddThread];
    })
  );

  for (const member of result.members) {
    const thread = threads.get(snowflakeToBigint(member.id!));
    thread?.members.set(snowflakeToBigint(member.userId!), {
      userId: snowflakeToBigint(member.userId!),
      flags: member.flags,
      joinTimestamp: Date.parse(member.joinTimestamp),
    });
  }

  return threads;
}
