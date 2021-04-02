import { botId } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";
import { delay } from "../../util/utils.ts";

/** Delete a message with the channel id and message id only. */
export async function deleteMessage(
  channelId: string,
  messageId: string,
  reason?: string,
  delayMilliseconds = 0,
) {
  const message = await cacheHandlers.get("messages", messageId);

  if (message && message.author.id !== botId) {
    await requireBotChannelPermissions(message.channelId, ["MANAGE_MESSAGES"]);
  }

  if (delayMilliseconds) await delay(delayMilliseconds);

  const result = await rest.runMethod(
    "delete",
    endpoints.CHANNEL_MESSAGE(channelId, messageId),
    { reason },
  );

  return result;
}
