import { DiscordGatewayPayload, DiscordUser } from '@discordeno/types'
import { Client } from '../../client.js'

export async function handleUserUpdate (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordUser
  client.events.botUpdate(client, client.transformers.user(client, payload))
}
