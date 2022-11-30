import { BotWithCache } from '../../deps.js'
import { requireBotGuildPermissions } from '../permissions.js'

export function banMember(bot: BotWithCache) {
  const banMember = bot.helpers.banMember

  bot.helpers.banMember = async function (guildId, id, options) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ['BAN_MEMBERS'])

    return await banMember(guildId, id, options)
  }
}
