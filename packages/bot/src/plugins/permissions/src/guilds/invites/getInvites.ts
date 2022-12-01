import { BotWithCache } from '../../../deps.js'
import { requireBotChannelPermissions } from '../../permissions.js'

export function getInvites (bot: BotWithCache) {
  const getInvites = bot.helpers.getInvites

  bot.helpers.getInvites = async function (guildId) {
    requireBotChannelPermissions(bot, guildId, ['MANAGE_GUILD'])

    return await getInvites(guildId)
  }
}
