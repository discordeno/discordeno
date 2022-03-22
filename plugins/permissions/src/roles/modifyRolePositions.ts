import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function modifyRolePositions(bot: BotWithCache) {
  const modifyRolePositionsOld = bot.helpers.modifyRolePositions;

  bot.helpers.modifyRolePositions = async function (guildId, categoryId) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_ROLES"]);

    return await modifyRolePositionsOld(guildId, categoryId);
  };
}
