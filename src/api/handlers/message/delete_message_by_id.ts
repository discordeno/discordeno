import { RequestManager } from "../../../rest/request_manager.ts";
import { endpoints } from "../../../util/constants.ts";
import { delay } from "../../../util/utils.ts";
import { cacheHandlers } from "../../controllers/cache.ts";
import { deleteMessage } from "./delete_message.ts";

/** Delete a message with the channel id and message id only. */
export async function deleteMessageByID(
  channelID: string,
  messageID: string,
  reason?: string,
  delayMilliseconds = 0,
) {
  const message = await cacheHandlers.get("messages", messageID);
  if (message) return deleteMessage(message, reason, delayMilliseconds);

  if (delayMilliseconds) await delay(delayMilliseconds);

  const result = await RequestManager.delete(
    endpoints.CHANNEL_MESSAGE(channelID, messageID),
    { reason },
  );

  return result;
}
