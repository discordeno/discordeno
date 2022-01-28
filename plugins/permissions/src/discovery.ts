import { BotWithCache } from "../deps.ts";
import { requireBotGuildPermissions } from "./permissions.ts";

export function addDiscoverySubcategory(bot: BotWithCache) {
  const addDiscoverySubcategoryOld = bot.helpers.addDiscoverySubcategory;

  bot.helpers.addDiscoverySubcategory = function (guildId, categoryId) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return addDiscoverySubcategoryOld(guildId, categoryId);
  };
}

export function removeDiscoverySubcategory(bot: BotWithCache) {
  const removeDiscoverySubcategoryOld = bot.helpers.removeDiscoverySubcategory;

  bot.helpers.removeDiscoverySubcategory = function (guildId, categoryId) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return removeDiscoverySubcategoryOld(guildId, categoryId);
  };
}

export function getDiscovery(bot: BotWithCache) {
  const getDiscoveryOld = bot.helpers.getDiscovery;

  bot.helpers.getDiscovery = function (guildId) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return getDiscoveryOld(guildId);
  };
}

export function editDiscovery(bot: BotWithCache) {
  const editDiscoveryOld = bot.helpers.editDiscovery;

  bot.helpers.editDiscovery = function (guildId, data) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return editDiscoveryOld(guildId, data);
  };
}

export default function setupDiscoveryPermChecks(bot: BotWithCache) {
  addDiscoverySubcategory(bot);
  editDiscovery(bot);
  getDiscovery(bot);
  removeDiscoverySubcategory(bot);
}
