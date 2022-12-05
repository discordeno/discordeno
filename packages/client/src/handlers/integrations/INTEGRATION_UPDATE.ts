import type {
  DiscordGatewayPayload,
  DiscordIntegrationCreateUpdate
} from '@discordeno/types'
import type { Client } from '../../client.js'

export function handleIntegrationUpdate (
  client: Client,
  data: DiscordGatewayPayload
): void {
  client.events.integrationUpdate(
    client,
    client.transformers.integration(
      client,
      data.d as DiscordIntegrationCreateUpdate
    )
  )
}
