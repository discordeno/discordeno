import { BotWithCache } from "../deps.ts";
import { requireBotGuildPermissions } from "./permissions.ts";

export function addDiscoverySubcategory(bot: BotWithCache) {
  const addDiscoverySubcategoryOld = bot.helpers.addDiscoverySubcategory;

  bot.helpers.addDiscoverySubcategory = async function (guildId, categoryId) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return await addDiscoverySubcategoryOld(guildId, categoryId);
  };
}

export function deleteDiscoverySubcategory(bot: BotWithCache) {
  const deleteDiscoverySubcategoryOld = bot.helpers.deleteDiscoverySubcategory;

  bot.helpers.deleteDiscoverySubcategory = async function (guildId, categoryId) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

    return await deleteDiscoverySubcategoryOld(guildId, categoryId);
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
  deleteDiscoverySubcategory(bot);
}
