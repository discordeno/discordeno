import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export default function swapChannels(bot: BotWithCache) {
  const swapChannelsOld = bot.helpers.swapChannels;

  bot.helpers.swapChannels = function (guildId, channelPositions) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_CHANNELS"]);

    return swapChannelsOld(guildId, channelPositions);
  };
}
