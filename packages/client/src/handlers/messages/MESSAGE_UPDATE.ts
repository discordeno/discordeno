import { DiscordGatewayPayload, DiscordMessage } from '@discordeno/types'
import { Client } from '../../client.js'

export async function handleMessageUpdate (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordMessage
  if (!payload.edited_timestamp) return

  client.events.messageUpdate(
    client,
    client.transformers.message(client, payload)
  )
}
