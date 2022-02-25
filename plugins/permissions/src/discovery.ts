import { BotWithCache } from "../deps.ts";
import { requireBotGuildPermissions } from "./permissions.ts";

export function addDiscoverySubcategory(bot: BotWithCache) {
  const addDiscoverySubcategoryOld = bot.helpers.addDiscoverySubcategory;

  bot.helpers.addDiscoverySubcategory = async function (guildId, categoryId) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return await addDiscoverySubcategoryOld(guildId, categoryId);
  };
}

export function removeDiscoverySubcategory(bot: BotWithCache) {
  const removeDiscoverySubcategoryOld = bot.helpers.removeDiscoverySubcategory;

  bot.helpers.removeDiscoverySubcategory = async function (guildId, categoryId) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return await removeDiscoverySubcategoryOld(guildId, categoryId);
  };
}

export function getDiscovery(bot: BotWithCache) {
  const getDiscoveryOld = bot.helpers.getDiscovery;

  bot.helpers.getDiscovery = async function (guildId) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return await getDiscoveryOld(guildId);
  };
}

export function editDiscovery(bot: BotWithCache) {
  const editDiscoveryOld = bot.helpers.editDiscovery;

  bot.helpers.editDiscovery = async function (guildId, data) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return await editDiscoveryOld(guildId, data);
  };
}

export default function setupDiscoveryPermChecks(bot: BotWithCache) {
  addDiscoverySubcategory(bot);
  editDiscovery(bot);
  getDiscovery(bot);
  removeDiscoverySubcategory(bot);
}
