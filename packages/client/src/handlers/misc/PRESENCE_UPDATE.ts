import {
  DiscordGatewayPayload,
  DiscordPresenceUpdate
} from '@discordeno/types'
import { Client } from '../../client.js'

export async function handlePresenceUpdate (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  client.events.presenceUpdate(
    client,
    client.transformers.presence(client, data.d as DiscordPresenceUpdate)
  )
}
