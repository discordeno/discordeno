import {
  DiscordChannelPinsUpdate,
  DiscordGatewayPayload
} from '@discordeno/types'
import type { Client } from '../../client.js'

export async function handleChannelPinsUpdate (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordChannelPinsUpdate

  client.events.channelPinsUpdate(client, {
    guildId: payload.guild_id
      ? client.transformers.snowflake(payload.guild_id)
      : undefined,
    channelId: client.transformers.snowflake(payload.channel_id),
    lastPinTimestamp: payload.last_pin_timestamp
      ? Date.parse(payload.last_pin_timestamp)
      : undefined
  })
}
