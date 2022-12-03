import { DiscordGatewayPayload, DiscordMessage } from '@discordeno/types'
import { Client } from '../../client.js'

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
