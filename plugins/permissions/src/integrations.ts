import { BotWithCache } from "../deps.ts";
import { requireBotGuildPermissions } from "./permissions.ts";

export function deleteIntegration(bot: BotWithCache) {
  const deleteIntegrationOld = bot.helpers.deleteIntegration;

  bot.helpers.deleteIntegration = async function (guildId, id) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return await deleteIntegrationOld(guildId, id);
  };
}

export function getIntegrations(bot: BotWithCache) {
  const getIntegrationsOld = bot.helpers.getIntegrations;

  bot.helpers.getIntegrations = async function (guildId) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return await getIntegrationsOld(guildId);
  };
}

export default function setupIntegrationPermChecks(bot: BotWithCache) {
  deleteIntegration(bot);
  getIntegrations(bot);
}
