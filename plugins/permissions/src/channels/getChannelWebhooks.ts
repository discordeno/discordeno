import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export default function getChannelWebhooks(bot: BotWithCache) {
  const getChannelWebhooksOld = bot.helpers.getChannelWebhooks;

  bot.helpers.getChannelWebhooks = async function (channelId) {
    const channel = bot.channels.get(channelId);
    if (channel?.guildId) {
      requireBotChannelPermissions(bot, channelId, ["MANAGE_WEBHOOKS"]);
    }

    return await getChannelWebhooksOld(channelId);
  };
}
