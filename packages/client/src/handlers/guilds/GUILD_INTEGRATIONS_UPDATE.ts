import type {
  DiscordGatewayPayload,
  DiscordGuildIntegrationsUpdate
} from '@discordeno/types'
import type { Client } from '../../client.js'

export async function handleGuildIntegrationsUpdate (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordGuildIntegrationsUpdate

  client.events.integrationUpdate(client, {
    guildId: client.transformers.snowflake(payload.guild_id)
  })
}
