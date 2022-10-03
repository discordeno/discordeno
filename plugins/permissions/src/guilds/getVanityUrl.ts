import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function getVanityUrl(bot: BotWithCache) {
  const getVanityUrl = bot.helpers.getVanityUrl;

  bot.helpers.getVanityUrl = async function (guildId) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ["MANAGE_GUILD"]);

    return await getVanityUrl(guildId);
  };
}
