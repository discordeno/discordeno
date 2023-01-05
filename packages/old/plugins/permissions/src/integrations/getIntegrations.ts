import type { BotWithCache } from '../../deps.js'
import { requireBotGuildPermissions } from '../permissions.js'

export function getIntegrations (bot: BotWithCache) {
  const getIntegrations = bot.helpers.getIntegrations

  bot.helpers.getIntegrations = async function (guildId) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ['MANAGE_GUILD'])

    return await getIntegrations(guildId)
  }
}
