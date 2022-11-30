import { BotWithCache, ChannelTypes, PermissionStrings } from '../../deps.js'
import { requireBotChannelPermissions } from '../permissions.js'

export function swapChannels(bot: BotWithCache) {
  const swapChannels = bot.helpers.swapChannels

  bot.helpers.swapChannels = async function (guildId, channelPositions) {
    for (const channelPosition of channelPositions) {
      const channel = bot.channels.get(BigInt(channelPosition.id))
      if (channel != null) {
        const perms: PermissionStrings[] = ['VIEW_CHANNEL', 'MANAGE_CHANNELS']
        const isVoice = [ChannelTypes.GuildVoice, ChannelTypes.GuildStageVoice].includes(channel.type)
        if (isVoice) perms.push('CONNECT')
        requireBotChannelPermissions(bot, BigInt(channelPosition.id), perms)
      }
    }
    return await swapChannels(guildId, channelPositions)
  }
}
