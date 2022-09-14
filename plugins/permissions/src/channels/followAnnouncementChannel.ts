import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function followAnnouncementChannel(bot: BotWithCache) {
  const followAnnouncementChannel = bot.helpers.followAnnouncementChannel;

  bot.helpers.followAnnouncementChannel = async function (sourceChannelId, targetChannelId) {
    const channel = bot.channels.get(targetChannelId);
    if (channel?.guildId) requireBotChannelPermissions(bot, channel, ["MANAGE_WEBHOOKS"]);

    return await followAnnouncementChannel(sourceChannelId, targetChannelId);
  };
}
