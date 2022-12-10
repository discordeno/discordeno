import type {
  DiscordGatewayPayload,
  DiscordIntegrationDelete
} from '@discordeno/types'
import type { Client } from '../../client.js'

export function handleIntegrationDelete (
  client: Client,
  data: DiscordGatewayPayload
): void {
  const payload = data.d as DiscordIntegrationDelete

  client.events.integrationDelete(client, {
    id: client.transformers.snowflake(payload.id),
    guildId: client.transformers.snowflake(payload.guild_id),
    applicationId: payload.application_id
      ? client.transformers.snowflake(payload.application_id)
      : undefined
  })
}
