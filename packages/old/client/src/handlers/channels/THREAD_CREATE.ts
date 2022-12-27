import type { DiscordChannel, DiscordGatewayPayload } from '@discordeno/types'
import type { Client } from '../../client.js'

export async function handleThreadCreate (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordChannel

  client.events.threadCreate(
    client,
    client.transformers.channel(client, { channel: payload })
  )
}
