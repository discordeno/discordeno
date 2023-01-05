import type { BotWithCache } from '../../deps.js'
import { requireBotChannelPermissions } from '../permissions.js'

export function getMessages (bot: BotWithCache) {
  const getMessages = bot.helpers.getMessages

  bot.helpers.getMessages = async function (channelId, options) {
    const channel = bot.channels.get(bot.transformers.snowflake(channelId))
    if (channel?.guildId) {
      requireBotChannelPermissions(bot, channel, [
        'READ_MESSAGE_HISTORY',
        'VIEW_CHANNEL'
      ])
    }

    return await getMessages(channelId, options)
  }
}
