import { botID } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";
import { delay } from "../../util/utils.ts";

/** Delete a message with the channel id and message id only. */
export async function deleteMessage(
  channelID: string,
  messageID: string,
  reason?: string,
  delayMilliseconds = 0,
) {
  const message = await cacheHandlers.get("messages", messageID);

  if (message && message.author.id !== botID) {
    await requireBotChannelPermissions(message.channelID, ["MANAGE_MESSAGES"]);
  }

  if (delayMilliseconds) await delay(delayMilliseconds);

  const result = await RequestManager.delete(
    endpoints.CHANNEL_MESSAGE(channelID, messageID),
    { reason },
  );

  return result;
}
