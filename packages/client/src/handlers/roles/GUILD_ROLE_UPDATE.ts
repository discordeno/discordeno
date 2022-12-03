import {
  DiscordGatewayPayload,
  DiscordGuildRoleUpdate
} from '@discordeno/types'
import { Client } from '../../client.js'

export async function handleGuildRoleUpdate (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordGuildRoleUpdate

  client.events.roleUpdate(
    client,
    client.transformers.role(client, {
      role: payload.role,
      guildId: client.transformers.snowflake(payload.guild_id)
    })
  )
}
