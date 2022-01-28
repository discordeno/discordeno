import { BotWithCache } from "../../deps.ts";
import { higherRolePosition } from "../permissions.ts";
import { highestRole, requireBotGuildPermissions } from "../permissions.ts";

export default function addRole(bot: BotWithCache) {
  const addRoleOld = bot.helpers.addRole;

  bot.helpers.addRole = function (
    guildId,
    memberId,
    roleId,
    reason,
  ) {
    const guild = bot.guilds.get(guildId);
    if (guild) {
      const role = guild.roles.get(roleId);
      if (role) {
        const botRole = highestRole(bot, guild, bot.id);

        if (!higherRolePosition(bot, guild, botRole.id, role.id)) {
          throw new Error(
            `The bot can not add this role to the member because it does not have a role higher than the role ID: ${role.id}.`,
          );
        }
      }

      requireBotGuildPermissions(bot, guild, ["MANAGE_ROLES"]);
    }

    return addRoleOld(guildId, memberId, roleId, reason);
  };
}
