import { BotWithCache } from "../../../deps.ts";
import { requireBotGuildPermissions } from "../../permissions.ts";

export function getAutomodRules(bot: BotWithCache) {
  const getAutomodRules = bot.helpers.getAutomodRules;

  bot.helpers.getAutomodRules = async function (guildId) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ["MANAGE_GUILD"]);

    return await getAutomodRules(guildId);
  };
}
