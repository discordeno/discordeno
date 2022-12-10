import type {
  DiscordGatewayPayload,
  DiscordGuildRoleDelete
} from '@discordeno/types'
import type { Client } from '../../client.js'

export async function handleGuildRoleDelete (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordGuildRoleDelete
  client.events.roleDelete(client, {
    roleId: client.transformers.snowflake(payload.role_id),
    guildId: client.transformers.snowflake(payload.guild_id)
  })
}
