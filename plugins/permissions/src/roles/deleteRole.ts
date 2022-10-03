import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function deleteRole(bot: BotWithCache) {
  const deleteRole = bot.helpers.deleteRole;

  bot.helpers.deleteRole = async function (guildId, id) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ["MANAGE_ROLES"]);

    return await deleteRole(guildId, id);
  };
}
