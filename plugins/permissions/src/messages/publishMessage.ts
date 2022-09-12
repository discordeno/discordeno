import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function publishMessage(bot: BotWithCache) {
  const publishMessage = bot.helpers.publishMessage;

  bot.helpers.publishMessage = function (channelId, messageId) {
    const message = bot.messages.get(messageId);

    requireBotChannelPermissions(
      bot,
      channelId,
      message?.authorId === bot.id ? ["SEND_MESSAGES"] : ["MANAGE_MESSAGES"],
    );

    return publishMessage(channelId, messageId);
  };
}
