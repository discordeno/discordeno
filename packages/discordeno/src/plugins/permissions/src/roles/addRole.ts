import { BotWithCache } from '../../deps.js'
import { higherRolePosition, highestRole, requireBotGuildPermissions } from '../permissions.js'

export function addRole(bot: BotWithCache) {
  const addRole = bot.helpers.addRole

  bot.helpers.addRole = async function (guildId, memberId, roleId, reason) {
    const guild = bot.guilds.get(bot.transformers.snowflake(guildId))
    if (guild != null) {
      const role = guild.roles.get(bot.transformers.snowflake(roleId))
      if (role != null) {
        const botRole = highestRole(bot, guild, bot.id)

        if (!higherRolePosition(bot, guild, botRole.id, role.id)) {
          throw new Error(
            `The bot can not add this role to the member because it does not have a role higher than the role ID: ${role.id}.`
          )
        }
      }

      requireBotGuildPermissions(bot, guild, ['MANAGE_ROLES'])
    }

    return await addRole(guildId, memberId, roleId, reason)
  }
}
