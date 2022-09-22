import { BotWithCache } from "../../../deps.ts";
import { requireBotGuildPermissions } from "../../permissions.ts";

export function getAutomodRule(bot: BotWithCache) {
  const getAutomodRule = bot.helpers.getAutomodRule;

  bot.helpers.getAutomodRule = async function (guildId, ruleId) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ["MANAGE_GUILD"]);

    return await getAutomodRule(guildId, ruleId);
  };
}
