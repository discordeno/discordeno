import type {
  DiscordGatewayPayload,
  DiscordThreadMemberUpdate
} from '@discordeno/types'
import type { Client } from '../../client.js'

export async function handleThreadMemberUpdate (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordThreadMemberUpdate

  client.events.threadMemberUpdate(client, {
    id: client.transformers.snowflake(payload.id),
    guildId: client.transformers.snowflake(payload.guild_id),
    joinedAt: Date.parse(payload.joined_at),
    flags: payload.flags
  })
}
