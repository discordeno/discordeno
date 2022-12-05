import type { Bot, Channel, CreateGuildChannel } from 'discordeno'
import { separateOverwrites } from 'discordeno'

/** Create a copy of a channel */
export async function cloneChannel (
  bot: Bot,
  channel: Channel,
  reason?: string
): Promise<Channel> {
  if (!channel.guildId) {
    throw new Error('Cannot clone a channel outside a guild')
  }

  const createChannelOptions: CreateGuildChannel = {
    type: channel.type,
    bitrate: channel.bitrate,
    userLimit: channel.userLimit,
    rateLimitPerUser: channel.rateLimitPerUser,
    position: channel.position,
    parentId: channel.parentId,
    nsfw: channel.nsfw,
    name: channel.name!,
    topic: channel.topic,
    permissionOverwrites: channel.permissionOverwrites.map((overwrite) => {
      const [type, id, allow, deny] = separateOverwrites(overwrite)

      return {
        id,
        type,
        allow: bot.utils.calculatePermissions(BigInt(allow)),
        deny: bot.utils.calculatePermissions(BigInt(deny))
      }
    }),
    reason
  }

  // Create the channel (also handles permissions)
  return await bot.helpers.createChannel(channel.guildId, createChannelOptions)
}
