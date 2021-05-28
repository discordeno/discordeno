import { rest } from "../../../rest/rest.ts";
import { ListPublicArchivedThreads } from "../../../types/channels/threads/list_public_archived_threads.ts";
import { endpoints } from "../../../util/constants.ts";
import { snakelize } from "../../../util/utils.ts";

export async function getArchivedThreads(
  channelId: bigint,
  options?: ListPublicArchivedThreads & {
    type?: "public" | "private" | "privateJoinedThreads";
  }
) {
  // TODO(threads): perm check
  // TODO(threads): check if this works

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
