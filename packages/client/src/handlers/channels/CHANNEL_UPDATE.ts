import { DiscordChannel, DiscordGatewayPayload } from '@discordeno/types'
import type { Client } from '../../client.js'

export async function handleChannelUpdate (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordChannel
  const channel = client.transformers.channel(client, { channel: payload })

  client.events.channelUpdate(client, channel)
}
