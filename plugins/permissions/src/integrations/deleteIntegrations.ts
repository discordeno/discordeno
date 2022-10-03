import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function deleteIntegration(bot: BotWithCache) {
  const deleteIntegration = bot.helpers.deleteIntegration;

  bot.helpers.deleteIntegration = async function (guildId, id) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ["MANAGE_GUILD"]);

    return await deleteIntegration(guildId, id);
  };
}
