import { BotWithCache, ChannelTypes } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function getChannelWebhooks(bot: BotWithCache) {
  const getChannelWebhooks = bot.helpers.getChannelWebhooks;

  bot.helpers.getChannelWebhooks = async function (channelId) {
    const channel = bot.channels.get(bot.transformers.snowflake(channelId));
    if (channel) {
      const isWebhookParent = [ChannelTypes.GuildAnnouncement, ChannelTypes.GuildText].includes(channel.type);
      if (!isWebhookParent) {
        throw new Error("Target channel must be a text channel or an announcement channel");
      }
      requireBotChannelPermissions(bot, bot.transformers.snowflake(channelId), ["VIEW_CHANNEL", "MANAGE_WEBHOOKS"]);
    }

    return await getChannelWebhooks(channelId);
  };
}
