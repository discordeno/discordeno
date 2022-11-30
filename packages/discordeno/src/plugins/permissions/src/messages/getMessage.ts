import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function getMessage(bot: BotWithCache) {
  const getMessage = bot.helpers.getMessage;

  bot.helpers.getMessage = async function (channelId, messageId) {
    const channel = bot.channels.get(bot.transformers.snowflake(channelId));
    if (channel?.guildId) requireBotChannelPermissions(bot, channel, ["READ_MESSAGE_HISTORY"]);

    return await getMessage(channelId, messageId);
  };
}
