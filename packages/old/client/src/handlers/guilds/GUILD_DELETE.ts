import type {
  DiscordGatewayPayload,
  DiscordUnavailableGuild
} from '@discordeno/types'
import type { Client } from '../../client.js'

export async function handleGuildDelete (
  client: Client,
  data: DiscordGatewayPayload,
  shardId: number
): Promise<void> {
  const payload = data.d as DiscordUnavailableGuild
  client.events.guildDelete(
    client,
    client.transformers.snowflake(payload.id),
    shardId
  )
}
