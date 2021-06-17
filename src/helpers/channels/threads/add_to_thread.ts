import { cacheHandlers } from "../../../cache.ts";
import { rest } from "../../../rest/rest.ts";
import { Errors } from "../../../types/discordeno/errors.ts";
import { endpoints } from "../../../util/constants.ts";
import { requireBotChannelPermissions } from "../../../util/permissions.ts";

/** Adds the bot to a thread. When a user id is provided, it adds that user to the thread. User id requires the ability to send messages in the thread. Both requires the thread is not archived.
 */
export async function addToThread(threadId: bigint, userId?: bigint) {
  const thread = await cacheHandlers.get("threads", threadId);
  if (thread) {
    if (thread.archived) {
      throw new Error(Errors.CANNOT_ADD_USER_TO_ARCHIVED_THREADS);
    }

    // If a user id is provided SEND_MESSAGES is required.
    if (userId) {
      const channel = await cacheHandlers.get("channels", thread.channelId);
      // TODO: does MANAGE_THREADS override this????
      if (channel) await requireBotChannelPermissions(channel, ["SEND_MESSAGES"]);
    }
  }

  return await rest.runMethod("put", userId ? endpoints.THREAD_USER(threadId, userId) : endpoints.THREAD_ME(threadId));
}
