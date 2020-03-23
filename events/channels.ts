import { cache } from "../utils/cache.ts"
import { Channel_Create_Payload, Channel_Types } from "../types/channel.ts"
import { create_channel } from "../structures/channel.ts"
import { event_handlers } from "../module/client.ts"

export const handle_internal_channel_create = (data: Channel_Create_Payload) => {
  const channel = create_channel(data)
  cache.channels.set(channel.id, channel)
  event_handlers.channel_create?.(channel)
}

export const handle_internal_channel_update = (data: Channel_Create_Payload) => {
  const cached_channel = cache.channels.get(data.id)
  const channel = create_channel(data)
  cache.channels.set(channel.id, channel)
  if (!cached_channel) return

  event_handlers.channel_update?.(channel, cached_channel)
}

export const handle_internal_channel_delete = (data: Channel_Create_Payload) => {
  const cached_channel = cache.channels.get(data.id)
  if (!cached_channel) return

  if (cached_channel.type() === Channel_Types.GUILD_VOICE && data.guild_id) {
    const guild = cache.guilds.get(data.guild_id)

    guild?.voice_states().forEach(vs => {
      if (vs.channel_id !== data.id) return

      const member = guild.members.get(vs.user_id)
      if (!member) return

      event_handlers.voice_channel_leave?.(member, vs.channel_id)
    })

    if (guild) {
      cache.guilds.set(data.guild_id, {
        ...guild,
        voice_states: () => [...guild.voice_states().filter(vs => vs.channel_id !== data.id)]
      })
    }
  }

  cache.channels.delete(data.id)
  event_handlers.channel_delete?.(cached_channel)
}
