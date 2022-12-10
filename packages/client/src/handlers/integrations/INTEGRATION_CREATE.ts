import type {
  DiscordGatewayPayload,
  DiscordIntegrationCreateUpdate
} from '@discordeno/types'
import type { Client } from '../../client.js'

export function handleIntegrationCreate (
  client: Client,
  data: DiscordGatewayPayload
): void {
  client.events.integrationCreate(
    client,
    client.transformers.integration(
      client,
      data.d as DiscordIntegrationCreateUpdate
    )
  )
}
