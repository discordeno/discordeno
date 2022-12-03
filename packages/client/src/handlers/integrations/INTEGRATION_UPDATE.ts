import {
  DiscordGatewayPayload,
  DiscordIntegrationCreateUpdate
} from '@discordeno/types'
import { Client } from '../../client.js'

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
