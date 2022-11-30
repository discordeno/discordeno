import { BotWithCache } from "../../deps.ts";
import { higherRolePosition, highestRole, requireBotGuildPermissions } from "../permissions.ts";

export function removeRole(bot: BotWithCache) {
  const removeRole = bot.helpers.removeRole;

  bot.helpers.removeRole = async function (
    guildId,
    memberId,
    roleId,
    reason,
  ) {
    const guild = bot.guilds.get(bot.transformers.snowflake(guildId));
    if (guild) {
      const role = guild.roles.get(bot.transformers.snowflake(roleId));
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

    return await removeRole(guildId, memberId, roleId, reason);
  };
}
