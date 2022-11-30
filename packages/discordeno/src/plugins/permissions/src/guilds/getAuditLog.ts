import { BotWithCache } from '../../deps.js'
import { requireBotGuildPermissions } from '../permissions.js'

export function getAuditLog (bot: BotWithCache) {
  const getAuditLog = bot.helpers.getAuditLog

  bot.helpers.getAuditLog = async function (guildId, options) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ['VIEW_AUDIT_LOG'])

    return await getAuditLog(guildId, options)
  }
}
