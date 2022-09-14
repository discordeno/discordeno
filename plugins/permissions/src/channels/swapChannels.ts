import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function swapChannels(bot: BotWithCache) {
  const swapChannels = bot.helpers.swapChannels;

  bot.helpers.swapChannels = async function (guildId, channelPositions) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_CHANNELS"]);

    return await swapChannels(guildId, channelPositions);
  };
}
