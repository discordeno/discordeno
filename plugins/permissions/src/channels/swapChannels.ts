import { BotWithCache } from "../../deps.ts";
import { requireBotChannelPermissions, requireBotGuildPermissions } from "../permissions.ts";

export default function swapChannels(bot: BotWithCache) {
  const swapChannelsOld = bot.helpers.swapChannels;

  bot.helpers.swapChannels = async function (guildId, channelPositions) {
    channelPositions.forEach((channelPosition) => {
      const channel = bot.channels.get(BigInt(channelPosition.id));
      if (channel) requireBotChannelPermissions(bot, channel.id, ["VIEW_CHANNEL"]);
    });

    requireBotGuildPermissions(bot, guildId, ["MANAGE_CHANNELS"]);

    return await swapChannelsOld(guildId, channelPositions);
  };
}
