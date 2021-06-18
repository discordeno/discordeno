import { rest } from "../../../rest/rest.ts";
import { ModifyThread } from "../../../types/channels/threads/modify_thread.ts";
import { endpoints } from "../../../util/constants.ts";
import { channelToThread } from "../../../util/transformers/channel_to_thread.ts";
import { snakelize } from "../../../util/utils.ts";

/** Update a thread's settings. Requires the `MANAGE_CHANNELS` permission for the guild. */
export async function editThread(threadId: bigint, options: ModifyThread, reason?: string) {
  // const thread = await cacheHandlers.get("threads", threadId);

  const result = await rest.runMethod(
    "patch",
    endpoints.CHANNEL_BASE(threadId),
    snakelize({
      ...options,
      reason,
    })
  );

  return channelToThread(result);
}
