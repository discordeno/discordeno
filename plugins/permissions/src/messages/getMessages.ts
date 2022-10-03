import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function getMessages(bot: BotWithCache) {
  const getMessages = bot.helpers.getMessages;

  bot.helpers.getMessages = async function (channelId, options) {
    const channel = bot.channels.get(bot.transformers.snowflake(channelId));
    if (channel?.guildId) {
      requireBotChannelPermissions(bot, channel, [
        "READ_MESSAGE_HISTORY",
        "VIEW_CHANNEL",
      ]);
    }

    return await getMessages(channelId, options);
  };
}
