import { BotWithCache } from '../../../deps.js'
import { requireBotChannelPermissions } from '../../permissions.js'

export function addReactions(bot: BotWithCache) {
  const addReactions = bot.helpers.addReactions

  bot.helpers.addReactions = async function (channelId, messageId, reactions, ordered) {
    requireBotChannelPermissions(bot, bot.transformers.snowflake(channelId), ['READ_MESSAGE_HISTORY', 'ADD_REACTIONS'])

    return await addReactions(channelId, messageId, reactions, ordered)
  }
}
