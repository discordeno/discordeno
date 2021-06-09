import { rest } from "../../../rest/rest.ts";
import { ListPublicArchivedThreads } from "../../../types/channels/threads/list_public_archived_threads.ts";
import { PermissionStrings } from "../../../types/permissions/permission_strings.ts";
import { endpoints } from "../../../util/constants.ts";
import { requireBotChannelPermissions } from "../../../util/permissions.ts";
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

  requireBotChannelPermissions(channelId, [...permissions]);
  // TODO(threads): check if this works

  // TODO: v12 map the result to a nice collection or maybe not, check what it returns
  return await rest.runMethod(
    "get",
    options?.type === "privateJoinedThreads"
      ? endpoints.THREAD_ARCHIVED_PRIVATE_JOINED(channelId)
      : options?.type === "private"
      ? endpoints.THREAD_ARCHIVED_PRIVATE(channelId)
      : endpoints.THREAD_ARCHIVED_PUBLIC(channelId),
    snakelize(options ?? {})
  );
}
