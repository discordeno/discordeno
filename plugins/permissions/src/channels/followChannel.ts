import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export default function followChannel(bot: BotWithCache) {
  const followChannelOld = bot.helpers.followChannel;

  bot.helpers.followChannel = function (sourceChannelId, targetChannelId) {
    const channel = bot.channels.get(targetChannelId);
    if (channel?.guildId) {
      requireBotChannelPermissions(bot, channel, ["MANAGE_WEBHOOKS"]);
    }

    return followChannelOld(sourceChannelId, targetChannelId);
  };
}
