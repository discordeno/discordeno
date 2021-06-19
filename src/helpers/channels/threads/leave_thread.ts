import { cacheHandlers } from "../../../cache.ts";
import { rest } from "../../../rest/rest.ts";
import { Errors } from "../../../types/discordeno/errors.ts";
import { endpoints } from "../../../util/constants.ts";

/** Removes the bot from a thread. Requires the thread is not archived. */
export async function leaveThread(threadId: bigint) {
  const thread = await cacheHandlers.get("threads", threadId);
  if (thread?.archived) throw new Error(Errors.CANNOT_LEAVE_ARCHIVED_THREAD);

  return await rest.runMethod<undefined>("delete", endpoints.THREAD_ME(threadId));
}
