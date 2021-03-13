import { botID } from "../../bot.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { Message } from "../../structures/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";
import { delay } from "../../util/utils.ts";

/** Delete a message */
export async function deleteMessage(
  message: Message,
  reason?: string,
  delayMilliseconds = 0,
) {
  if (message.author.id !== botID) {
    // This needs to check the channels permission not the guild permission
    await requireBotChannelPermissions(message.channelID, ["MANAGE_MESSAGES"]);
  }

  if (delayMilliseconds) await delay(delayMilliseconds);

  const result = await RequestManager.delete(
    endpoints.CHANNEL_MESSAGE(message.channelID, message.id),
    { reason },
  );

  return result;
}
