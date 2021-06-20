import { cacheHandlers } from "../../../cache.ts";
import { rest } from "../../../rest/rest.ts";
import { Errors } from "../../../types/discordeno/errors.ts";
import { endpoints } from "../../../util/constants.ts";

/** Adds the bot to the thread. Cannot join an archived thread. */
export async function joinThread(threadId: bigint) {
  const thread = await cacheHandlers.get("threads", threadId);
  if (thread?.archived) {
    throw new Error(Errors.CANNOT_ADD_USER_TO_ARCHIVED_THREADS);
  }

  return await rest.runMethod<undefined>("put", endpoints.THREAD_ME(threadId));
}
