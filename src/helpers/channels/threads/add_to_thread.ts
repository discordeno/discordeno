import { cacheHandlers } from "../../../cache.ts";
import { rest } from "../../../rest/rest.ts";
import { Errors } from "../../../types/discordeno/errors.ts";
import { endpoints } from "../../../util/constants.ts";
import { requireBotChannelPermissions } from "../../../util/permissions.ts";

/** Adds a user to a thread. Requires the ability to send messages in the thread. Requires the thread is not archived. */
export async function addToThread(threadId: bigint, userId: bigint) {
  const thread = await cacheHandlers.get("threads", threadId);
  if (thread) {
    if (thread.archived) {
      throw new Error(Errors.CANNOT_ADD_USER_TO_ARCHIVED_THREADS);
    }

    // If a user id is provided SEND_MESSAGES is required.
    const channel = await cacheHandlers.get("channels", thread.parentId);
    // TODO: does MANAGE_THREADS override this????
    if (channel) await requireBotChannelPermissions(channel, ["SEND_MESSAGES"]);
  }

  return await rest.runMethod<undefined>("put", endpoints.THREAD_USER(threadId, userId));
}
