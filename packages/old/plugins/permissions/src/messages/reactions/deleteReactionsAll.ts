import type { BotWithCache } from '../../../deps.js'
import { requireBotChannelPermissions } from '../../permissions.js'

export function deleteReactionsAll (bot: BotWithCache) {
  const deleteReactionsAll = bot.helpers.deleteReactionsAll

  bot.helpers.deleteReactionsAll = async function (channelId, messageId) {
    requireBotChannelPermissions(bot, bot.transformers.snowflake(channelId), ['MANAGE_MESSAGES'])

    return await deleteReactionsAll(channelId, messageId)
  }
}
