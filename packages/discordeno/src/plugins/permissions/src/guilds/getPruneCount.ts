import { BotWithCache } from '../../deps.js'
import { requireBotGuildPermissions } from '../permissions.js'

export function getPruneCount(bot: BotWithCache) {
  const getPruneCount = bot.helpers.getPruneCount

  bot.helpers.getPruneCount = async function (guildId, options) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ['KICK_MEMBERS'])

    return await getPruneCount(guildId, options)
  }
}
