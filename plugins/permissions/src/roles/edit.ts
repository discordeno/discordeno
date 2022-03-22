import { BotWithCache } from "../../deps.ts";
import { higherRolePosition } from "../permissions.ts";
import { highestRole, requireBotGuildPermissions } from "../permissions.ts";

export default function editRole(bot: BotWithCache) {
  const editRoleOld = bot.helpers.editRole;

  bot.helpers.editRole = async function (
    guildId,
    id,
    options,
  ) {
    const guild = bot.guilds.get(guildId);
    if (guild) {
      const role = guild.roles.get(id);
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

    return await editRoleOld(guildId, id, options);
  };
}

