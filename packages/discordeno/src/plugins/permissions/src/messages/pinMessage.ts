import { BotWithCache } from '../../deps.js'
import { requireBotChannelPermissions } from '../permissions.js'

export function pinMessage(bot: BotWithCache) {
  const pinMessage = bot.helpers.pinMessage

  bot.helpers.pinMessage = async function (
    channelId,
    messageId
  ) {
    requireBotChannelPermissions(bot, bot.transformers.snowflake(channelId), [
      'MANAGE_MESSAGES'
    ])

    return await pinMessage(channelId, messageId)
  }
}
