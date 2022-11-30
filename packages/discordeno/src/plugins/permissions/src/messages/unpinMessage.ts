import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function unpinMessage(bot: BotWithCache) {
  const unpinMessage = bot.helpers.unpinMessage;

  bot.helpers.unpinMessage = async function (channelId, messageId) {
    requireBotChannelPermissions(bot, bot.transformers.snowflake(channelId), ["MANAGE_MESSAGES"]);

    return await unpinMessage(channelId, messageId);
  };
}
