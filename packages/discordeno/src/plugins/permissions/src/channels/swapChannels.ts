import { BotWithCache, ChannelTypes, PermissionStrings } from "../../deps.ts";
import { requireBotChannelPermissions } from "../permissions.ts";

export function swapChannels(bot: BotWithCache) {
  const swapChannels = bot.helpers.swapChannels;

  bot.helpers.swapChannels = async function (guildId, channelPositions) {
    for (const channelPosition of channelPositions) {
      const channel = bot.channels.get(BigInt(channelPosition.id));
      if (channel) {
        const perms: PermissionStrings[] = ["VIEW_CHANNEL", "MANAGE_CHANNELS"];
        const isVoice = [ChannelTypes.GuildVoice, ChannelTypes.GuildStageVoice].includes(channel.type);
        if (isVoice) perms.push("CONNECT");
        requireBotChannelPermissions(bot, BigInt(channelPosition.id), perms);
      }
    }
    return await swapChannels(guildId, channelPositions);
  };
}
