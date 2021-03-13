import { botID } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { Errors } from "../../types/errors.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";
import { delay } from "../../util/utils.ts";

/** Delete a message with the channel id and message id only. */
export async function deleteMessage(
  messageID: string,
  reason?: string,
  delayMilliseconds = 0,
) {
  const message = await cacheHandlers.get("messages", messageID);
  if (!message) throw new Error(Errors.MESSAGE_NOT_FOUND);

  if (message.author.id !== botID) {
    await requireBotChannelPermissions(message.channelID, ["MANAGE_MESSAGES"]);
  }

  if (delayMilliseconds) await delay(delayMilliseconds);

  const result = await RequestManager.delete(
    endpoints.CHANNEL_MESSAGE(message.channelID, messageID),
    { reason },
  );

  return result;
}
