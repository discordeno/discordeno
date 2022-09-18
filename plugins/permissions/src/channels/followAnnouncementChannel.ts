import { BotWithCache, ChannelTypes } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function followAnnouncementChannel(bot: BotWithCache) {
  const followAnnouncementChannel = bot.helpers.followAnnouncementChannel;

  bot.helpers.followAnnouncementChannel = async function (sourceChannelId, targetChannelId) {
    const sourceChannel = bot.channels.get(sourceChannelId);
    if (sourceChannel && sourceChannel.type !== ChannelTypes.GuildAnnouncement) {
      throw new Error("Source channel must be an announcement channel");
    }
    const targetChannel = bot.channels.get(targetChannelId);
    if (targetChannel) {
      const isWebhookParent = [ChannelTypes.GuildAnnouncement, ChannelTypes.GuildText].includes(targetChannel.type);
      if (!isWebhookParent) {
        throw new Error("Target channel must be a text channel or an announcement channel");
      }
    }
    requireBotChannelPermissions(bot, sourceChannelId, ["VIEW_CHANNEL"]);
    requireBotChannelPermissions(bot, targetChannelId, ["VIEW_CHANNEL", "MANAGE_WEBHOOKS"]);
    return await followAnnouncementChannel(sourceChannelId, targetChannelId);
  };
}
