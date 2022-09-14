import { BotWithCache, ChannelTypes } from "../../deps.ts";
import { requireBotChannelPermissions, requireBotGuildPermissions } from "../permissions.ts";

export function swapChannels(bot: BotWithCache) {
  const swapChannels = bot.helpers.swapChannels;

  bot.helpers.swapChannels = async function (guildId, channelPositions) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_CHANNELS"]);
    for (const channelPosition of channelPositions) {
      const channel = bot.channels.get(BigInt(channelPosition.id));
      if (channel) {
        requireBotChannelPermissions(
          bot,
          BigInt(channelPosition.id),
          [ChannelTypes.GuildVoice, ChannelTypes.GuildStageVoice].includes(channel.type)
            ? ["VIEW_CHANNEL", "CONNECT"]
            : ["VIEW_CHANNEL"],
        );
      }
    }
    return await swapChannels(guildId, channelPositions);
  };
}
