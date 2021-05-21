import { rest } from "../../../rest/rest.ts";
import { endpoints } from "../../../util/constants.ts";

/** Returns all active threads in the channel, including public and private threads. Threads are ordered by their id, in descending order. Requires the READ_MESSAGE_HISTORY permission. */
export async function getActiveThreads(channelId: bigint) {
  // TODO(threads): perm check
  // TODO(threads): test if it works
  return await rest.runMethod("get", endpoints.THREAD_ACTIVE(channelId));
}
