import { BotWithCache } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export default function deleteRole(bot: BotWithCache) {
  const deleteRoleOld = bot.helpers.deleteRole;

  bot.helpers.deleteRole = function (
    guildId,
    id,
  ) {
    requireBotGuildPermissions(bot, guildId, ["MANAGE_ROLES"]);

    return deleteRoleOld(guildId, id);
  };
}
