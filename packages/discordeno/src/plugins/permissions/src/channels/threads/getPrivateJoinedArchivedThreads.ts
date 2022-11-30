import { BotWithCache, ChannelTypes } from '../../../deps.js'
import { requireBotChannelPermissions } from '../../permissions.js'

export function getPrivateJoinedArchivedThreads(bot: BotWithCache) {
  const getPrivateJoinedArchivedThreads = bot.helpers.getPrivateJoinedArchivedThreads
  bot.helpers.getPrivateJoinedArchivedThreads = async function (channelId, options) {
    const channel = bot.channels.get(bot.transformers.snowflake(channelId))

    if (channel != null) {
      const isThreadParent = [ChannelTypes.GuildText, ChannelTypes.GuildAnnouncement, ChannelTypes.GuildForum]
        .includes(channel.type)
      if (!isThreadParent) {
        throw new Error('Channel must be a text channel, a forum channel, or an announcement channel')
      }
    }
    requireBotChannelPermissions(bot, bot.transformers.snowflake(channelId), ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'])

    return await getPrivateJoinedArchivedThreads(channelId, options)
  }
}
