import { BotWithCache } from '../../../deps.js'
import { requireBotGuildPermissions } from '../../permissions.js'

export function getAutomodRule(bot: BotWithCache) {
  const getAutomodRule = bot.helpers.getAutomodRule

  bot.helpers.getAutomodRule = async function (guildId, ruleId) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ['MANAGE_GUILD'])

    return await getAutomodRule(guildId, ruleId)
  }
}
