import { BotWithCache } from "../deps.ts";
import { requireBotGuildPermissions } from "./permissions.ts";

export function deleteIntegration(bot: BotWithCache) {
  const deleteIntegrationOld = bot.helpers.deleteIntegration;

  bot.helpers.deleteIntegration = function (guildId, id) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return deleteIntegrationOld(guildId, id);
  };
}

export function getIntegrations(bot: BotWithCache) {
  const getIntegrationsOld = bot.helpers.getIntegrations;

  bot.helpers.getIntegrations = function (guildId) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return getIntegrationsOld(guildId);
  };
}

export default function setupIntegrationPermChecks(bot: BotWithCache) {
  deleteIntegration(bot);
  getIntegrations(bot);
}
