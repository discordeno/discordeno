import { botID } from "../../../bot.ts";
import { RequestManager } from "../../../rest/request_manager.ts";
import { endpoints } from "../../../util/constants.ts";
import { delay } from "../../../util/utils.ts";

/** Delete a message with the channel id and message id only. */
export async function deleteMessage(
  channelID: string,
  messageID: string,
  reason?: string,
  delayMilliseconds = 0,
) {
  const message = await cacheHandlers.get("messages", messageID);
  if (message) {
    if (message.author.id !== botID) {
      // This needs to check the channels permission not the guild permission
      const hasManageMessages = await botHasChannelPermissions(
        message.channelID,
        ["MANAGE_MESSAGES"],
      );
      if (
        !hasManageMessages
      ) {
        throw new Error(Errors.MISSING_MANAGE_MESSAGES);
      }
    }
  }

  if (delayMilliseconds) await delay(delayMilliseconds);

  const result = await RequestManager.delete(
    endpoints.CHANNEL_MESSAGE(channelID, messageID),
    { reason },
  );

  return result;
}
