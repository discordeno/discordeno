import { BotWithCache, ChannelTypes } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function getChannelWebhooks(bot: BotWithCache) {
  const getChannelWebhooks = bot.helpers.getChannelWebhooks;

  bot.helpers.getChannelWebhooks = async function (channelId) {
    const channel = bot.channels.get(channelId);
    if (channel) {
      if ([ChannelTypes.GuildAnnouncement, ChannelTypes.GuildText].includes(channel.type)) {
        throw new Error("Target channel must be a text channel or an announcement channel");
      }
      requireBotChannelPermissions(bot, channelId, ["VIEW_CHANNEL", "MANAGE_WEBHOOKS"]);
    }

    return await getChannelWebhooks(channelId);
  };
}
