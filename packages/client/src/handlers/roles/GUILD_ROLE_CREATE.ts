import {
  DiscordGatewayPayload,
  DiscordGuildRoleCreate
} from '@discordeno/types'
import { Client } from '../../client.js'

export async function handleGuildRoleCreate (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordGuildRoleCreate
  client.events.roleCreate(
    client,
    client.transformers.role(client, {
      role: payload.role,
      guildId: client.transformers.snowflake(payload.guild_id)
    })
  )
}
