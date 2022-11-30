import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function modifyRolePositions(bot: BotWithCache) {
  const modifyRolePositions = bot.helpers.modifyRolePositions;

  bot.helpers.modifyRolePositions = async function (guildId, categoryId) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ["MANAGE_ROLES"]);

    return await modifyRolePositions(guildId, categoryId);
  };
}
