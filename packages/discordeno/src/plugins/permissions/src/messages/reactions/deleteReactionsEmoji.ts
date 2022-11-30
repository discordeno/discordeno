import { BotWithCache } from '../../../deps.js'
import { requireBotChannelPermissions } from '../../permissions.js'

export function deleteReactionsEmoji (bot: BotWithCache) {
  const deleteReactionsEmoji = bot.helpers.deleteReactionsEmoji

  bot.helpers.deleteReactionsEmoji = async function (channelId, messageId, reaction) {
    requireBotChannelPermissions(bot, bot.transformers.snowflake(channelId), ['MANAGE_MESSAGES'])

    return await deleteReactionsEmoji(channelId, messageId, reaction)
  }
}
