import { cacheHandlers } from "../../../cache.ts";
import { rest } from "../../../rest/rest.ts";
import { endpoints } from "../../../util/constants.ts";
import { requireBotGuildPermissions } from "../../../util/permissions.ts";

/** Delete a thread in your server. Bot needs MANAGE_THREADS permissions in the server. */
export async function deleteThread(threadId: bigint, reason?: string) {
  const thread = await cacheHandlers.get("threads", threadId);
  if (thread) {
    const channel = await cacheHandlers.get("channels", thread?.parentId);
    if (channel?.guildId) await requireBotGuildPermissions(channel.guildId, ["MANAGE_THREADS"]);
  }

  return await rest.runMethod<undefined>("delete", endpoints.CHANNEL_BASE(threadId), { reason });
}
