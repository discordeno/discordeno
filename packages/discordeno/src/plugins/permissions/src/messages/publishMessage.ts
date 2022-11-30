import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function publishMessage(bot: BotWithCache) {
  const publishMessage = bot.helpers.publishMessage;

  bot.helpers.publishMessage = function (channelId, messageId) {
    const message = bot.messages.get(bot.transformers.snowflake(messageId));

    requireBotChannelPermissions(
      bot,
      bot.transformers.snowflake(channelId),
      message?.authorId === bot.id ? ["SEND_MESSAGES"] : ["MANAGE_MESSAGES"],
    );

    return publishMessage(channelId, messageId);
  };
}
