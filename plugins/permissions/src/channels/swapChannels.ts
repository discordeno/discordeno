import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export default function swapChannels(bot: BotWithCache) {
  const swapChannelsOld = bot.helpers.swapChannels;

  bot.helpers.swapChannels = async function (guildId, channelPositions) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_CHANNELS"]);

    return await swapChannelsOld(guildId, channelPositions);
  };
}
