import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export default function getVanityUrl(bot: BotWithCache) {
  const getVanityUrlOld = bot.helpers.getVanityUrl;

  bot.helpers.getVanityUrl = function (guildId) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return getVanityUrlOld(guildId);
  };
}
