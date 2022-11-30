import { BotWithCache } from '../../deps.js'
import { requireBotGuildPermissions } from '../permissions.js'

export function getBans (bot: BotWithCache) {
  const getBans = bot.helpers.getBans

  bot.helpers.getBans = async function (guildId) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ['BAN_MEMBERS'])

    return await getBans(guildId)
  }
}
