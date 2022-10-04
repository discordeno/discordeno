import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function getIntegrations(bot: BotWithCache) {
  const getIntegrations = bot.helpers.getIntegrations;

  bot.helpers.getIntegrations = async function (guildId) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ["MANAGE_GUILD"]);

    return await getIntegrations(guildId);
  };
}
