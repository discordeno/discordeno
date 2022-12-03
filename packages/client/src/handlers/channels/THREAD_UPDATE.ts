import { DiscordChannel, DiscordGatewayPayload } from '@discordeno/types'
import { Client } from '../../client.js'

export async function handleThreadUpdate (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordChannel

  client.events.threadUpdate(
    client,
    client.transformers.channel(client, { channel: payload })
  )
}
