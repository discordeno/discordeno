import { BotWithCache } from '../../deps.js'
import { requireBotGuildPermissions } from '../permissions.js'

export function getBan(bot: BotWithCache) {
  const getBan = bot.helpers.getBan

  bot.helpers.getBan = async function (guildId, memberId) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ['BAN_MEMBERS'])

    return await getBan(guildId, memberId)
  }
}
