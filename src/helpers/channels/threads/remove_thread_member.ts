import { botId } from "../../../bot.ts";
import { cacheHandlers } from "../../../cache.ts";
import { rest } from "../../../rest/rest.ts";
import { Errors } from "../../../types/discordeno/errors.ts";
import { endpoints } from "../../../util/constants.ts";
import { requireBotChannelPermissions } from "../../../util/permissions.ts";

/** Removes a user from a thread. Requires the MANAGE_THREADS permission or that you are the creator of the thread. Also requires the thread is not archived. */
export async function removeThreadMember(threadId: bigint, userId: bigint) {
  const thread = await cacheHandlers.get("threads", threadId);
  if (thread) {
    if (thread.archived) throw new Error(Errors.CANNOT_REMOVE_FROM_ARCHIVED_THREAD);

    if (thread.ownerId !== botId) {
      const channel = await cacheHandlers.get("channels", thread.parentId);
      if (channel) await requireBotChannelPermissions(channel, ["MANAGE_THREADS"]);
    }
  }

  return await rest.runMethod("delete", endpoints.THREAD_USER(threadId, userId));
}
