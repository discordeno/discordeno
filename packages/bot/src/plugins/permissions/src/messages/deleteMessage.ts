import { BotWithCache } from '../../deps.js'
import { requireBotChannelPermissions } from '../permissions.js'

export function deleteMessage (bot: BotWithCache) {
  const deleteMessage = bot.helpers.deleteMessage

  bot.helpers.deleteMessage = async function (channelId, messageId, reason, milliseconds) {
    const message = bot.messages.get(bot.transformers.snowflake(messageId))
    // DELETING SELF MESSAGES IS ALWAYS ALLOWED
    if (message?.authorId === bot.id) return await deleteMessage(channelId, messageId, reason, milliseconds)

    const channel = bot.channels.get(bot.transformers.snowflake(channelId))
    if (channel?.guildId) {
      requireBotChannelPermissions(bot, channel, [
        'MANAGE_MESSAGES'
      ])
    } else {
      throw new Error(
        `You can only delete messages in a channel which has a guild id. Channel ID: ${channelId} Message Id: ${messageId}`
      )
    }

    return await deleteMessage(channelId, messageId, reason, milliseconds)
  }
}
