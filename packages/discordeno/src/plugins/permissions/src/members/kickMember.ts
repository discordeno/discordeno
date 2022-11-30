import { BotWithCache } from '../../deps.js'
import { requireBotGuildPermissions } from '../permissions.js'

export function kickMember(bot: BotWithCache) {
  const kickMember = bot.helpers.kickMember

  bot.helpers.kickMember = async function (guildId, memberId, reason) {
    requireBotGuildPermissions(bot, bot.transformers.snowflake(guildId), ['KICK_MEMBERS'])

    return await kickMember(guildId, memberId, reason)
  }
}
