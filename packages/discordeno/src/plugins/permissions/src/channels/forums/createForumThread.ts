import { BotWithCache, ChannelTypes } from '../../../deps.js'
import { requireBotChannelPermissions } from '../../permissions.js'

export function createForumThread(bot: BotWithCache) {
  const createForumThread = bot.helpers.createForumThread

  bot.helpers.createForumThread = async function (channelId, options) {
    const channel = bot.channels.get(bot.transformers.snowflake(channelId))

    if ((channel != null) && channel.type !== ChannelTypes.GuildForum) {
      throw new Error('Channel must be a forum channel')
    }
    requireBotChannelPermissions(bot, bot.transformers.snowflake(channelId), ['VIEW_CHANNEL', 'SEND_MESSAGES'])

    return await createForumThread(channelId, options)
  }
}
