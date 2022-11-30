import { BotWithCache } from "../../../deps.ts";
import { requireBotChannelPermissions } from "../../permissions.ts";

export function getInvites(bot: BotWithCache) {
  const getInvites = bot.helpers.getInvites;

  bot.helpers.getInvites = async function (guildId) {
    requireBotChannelPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return await getInvites(guildId);
  };
}
