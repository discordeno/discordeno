import { Channel } from "../types/return-type.ts"
import { cache } from "../utils/cache.ts"

export const handle_internal_channel_create = (channel: Channel) => {
  cache.channels.set(channel.id, channel)
}

export const handle_internal_channel_update = (channel: Channel) => {
  cache.channels.set(channel.id, channel)
}

export const handle_internal_channel_delete = (channel: Channel) => {
  cache.channels.delete(channel.id)
}
