import { BotWithCache } from '../../deps.js'
import { requireBotGuildPermissions } from '../permissions.js'

export function deleteIntegration (bot: BotWithCache) {
  const deleteIntegration = bot.helpers.deleteIntegration

  bot.helpers.deleteIntegration = async function (guildId, id) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ['MANAGE_GUILD'])

    return await deleteIntegration(guildId, id)
  }
}
