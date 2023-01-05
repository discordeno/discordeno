import type { BotWithCache } from '../../deps.js'
import { requireBotGuildPermissions } from '../permissions.js'

export function unbanMember (bot: BotWithCache) {
  const unbanMember = bot.helpers.unbanMember

  bot.helpers.unbanMember = async function (guildId, id) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ['BAN_MEMBERS'])

    return await unbanMember(guildId, id)
  }
}
