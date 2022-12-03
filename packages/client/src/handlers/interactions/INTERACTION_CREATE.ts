import { DiscordGatewayPayload, DiscordInteraction } from '@discordeno/types'
import { Client } from '../../client.js'

export async function handleInteractionCreate (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  client.cache.unrepliedInteractions.add(
    client.transformers.snowflake((data.d as DiscordInteraction).id)
  )
  client.events.interactionCreate(
    client,
    client.transformers.interaction(client, data.d as DiscordInteraction)
  )
}
