import type { BotWithCache } from '../../../deps.js'
import { requireBotChannelPermissions } from '../../permissions.js'

export function addReaction (bot: BotWithCache) {
  const addReaction = bot.helpers.addReaction

  bot.helpers.addReaction = async function (channelId, messageId, reaction) {
    requireBotChannelPermissions(bot, bot.transformers.snowflake(channelId), ['READ_MESSAGE_HISTORY', 'ADD_REACTIONS'])

    return await addReaction(channelId, messageId, reaction)
  }
}
