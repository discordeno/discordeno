import { rest } from "../../../rest/rest.ts";
import { endpoints } from "../../../util/constants.ts";
import { requireBotChannelPermissions } from "../../../util/permissions.ts";

/** Returns all active threads in the channel, including public and private threads. Threads are ordered by their id, in descending order. Requires the READ_MESSAGE_HISTORY permission. */
export async function getActiveThreads(channelId: bigint) {
  await requireBotChannelPermissions(channelId, ["READ_MESSAGE_HISTORY"]);

  // TODO: v12 map the result to a nice collection
  return await rest.runMethod("get", endpoints.THREAD_ACTIVE(channelId));
}
