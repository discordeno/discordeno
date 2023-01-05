import type { BotWithCache } from '../../deps.js'
import { requireBotGuildPermissions } from '../permissions.js'

export function modifyRolePositions (bot: BotWithCache) {
  const modifyRolePositions = bot.helpers.modifyRolePositions

  bot.helpers.modifyRolePositions = async function (guildId, categoryId) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ['MANAGE_ROLES'])

    return await modifyRolePositions(guildId, categoryId)
  }
}
