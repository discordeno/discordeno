import { BotWithCache } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function createInvite(bot: BotWithCache) {
  const createInvite = bot.helpers.createInvite;

  bot.helpers.createInvite = async function (channelId, options = {}) {
    requireBotChannelPermissions(bot, channelId, ["CREATE_INSTANT_INVITE"]);

    return await createInvite(channelId, options);
  };
}
