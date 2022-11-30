import { BotWithCache } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function getChannelInvites(bot: BotWithCache) {
  const getChannelInvites = bot.helpers.getChannelInvites;

  bot.helpers.getChannelInvites = async function (channelId) {
    requireBotChannelPermissions(bot, channelId, ["MANAGE_CHANNELS"]);

    return await getChannelInvites(channelId);
  };
}
