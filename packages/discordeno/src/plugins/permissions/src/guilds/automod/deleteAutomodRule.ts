import { BotWithCache } from "../../../deps.ts";
import { requireBotGuildPermissions } from "../../permissions.ts";

export function deleteAutomodRule(bot: BotWithCache) {
  const deleteAutomodRule = bot.helpers.deleteAutomodRule;

  bot.helpers.deleteAutomodRule = async function (guildId, options) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ["MANAGE_GUILD"]);

    return await deleteAutomodRule(guildId, options);
  };
}
