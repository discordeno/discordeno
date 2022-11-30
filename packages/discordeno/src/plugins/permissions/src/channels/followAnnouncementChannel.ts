import { BotWithCache, ChannelTypes } from '../../deps.js'
import { requireBotChannelPermissions } from '../permissions.js'

export function followAnnouncementChannel(bot: BotWithCache) {
  const followAnnouncementChannel = bot.helpers.followAnnouncementChannel

  bot.helpers.followAnnouncementChannel = async function (sourceChannelId, targetChannelId) {
    const sourceChannel = bot.channels.get(bot.transformers.snowflake(sourceChannelId))
    if ((sourceChannel != null) && sourceChannel.type !== ChannelTypes.GuildAnnouncement) {
      throw new Error('Source channel must be an announcement channel')
    }
    const targetChannel = bot.channels.get(bot.transformers.snowflake(targetChannelId))
    if (targetChannel != null) {
      const isWebhookParent = [ChannelTypes.GuildAnnouncement, ChannelTypes.GuildText].includes(targetChannel.type)
      if (!isWebhookParent) {
        throw new Error('Target channel must be a text channel or an announcement channel')
      }
    }
    requireBotChannelPermissions(bot, bot.transformers.snowflake(sourceChannelId), ['VIEW_CHANNEL'])
    requireBotChannelPermissions(bot, bot.transformers.snowflake(targetChannelId), ['VIEW_CHANNEL', 'MANAGE_WEBHOOKS'])
    return await followAnnouncementChannel(sourceChannelId, targetChannelId)
  }
}
