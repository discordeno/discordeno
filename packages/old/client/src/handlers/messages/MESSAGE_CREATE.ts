import type { DiscordGatewayPayload, DiscordMessage } from '@discordeno/types'
import type { Client } from '../../client.js'

export async function handleMessageCreate (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordMessage

  client.events.messageCreate(
    client,
    client.transformers.message(client, payload)
  )
}
