import type { BotWithCache } from '../../deps.js'
import { requireBotChannelPermissions } from '../permissions.js'

export function publishMessage (bot: BotWithCache) {
  const publishMessage = bot.helpers.publishMessage

  bot.helpers.publishMessage = async function (channelId, messageId) {
    const message = bot.messages.get(bot.transformers.snowflake(messageId))

    requireBotChannelPermissions(
      bot,
      bot.transformers.snowflake(channelId),
      message?.authorId === bot.id ? ['SEND_MESSAGES'] : ['MANAGE_MESSAGES']
    )

    return await publishMessage(channelId, messageId)
  }
}
