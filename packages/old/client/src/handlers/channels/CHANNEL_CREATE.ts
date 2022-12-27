import type { DiscordChannel, DiscordGatewayPayload } from '@discordeno/types'
import type { Client } from '../../client.js'

export async function handleChannelCreate (
  client: Client,
  payload: DiscordGatewayPayload
): Promise<void> {
  const channel = client.transformers.channel(client, {
    channel: payload.d as DiscordChannel
  })

  client.events.channelCreate(client, channel)
}
