import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function getChannelWebhooks(bot: BotWithCache) {
  const getChannelWebhooks = bot.helpers.getChannelWebhooks;

  bot.helpers.getChannelWebhooks = async function (channelId) {
    const channel = bot.channels.get(channelId);
    if (channel?.guildId) {
      requireBotChannelPermissions(bot, channelId, ["MANAGE_WEBHOOKS"]);
    }

    return await getChannelWebhooks(channelId);
  };
}
