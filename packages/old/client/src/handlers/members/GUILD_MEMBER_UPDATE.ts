import type {
  DiscordGatewayPayload,
  DiscordGuildMemberUpdate
} from '@discordeno/types'
import type { Client } from '../../client.js'

export async function handleGuildMemberUpdate (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordGuildMemberUpdate

  const user = client.transformers.user(client, payload.user)
  client.events.guildMemberUpdate(
    client,
    client.transformers.member(
      client,
      payload,
      client.transformers.snowflake(payload.guild_id),
      user.id
    ),
    user
  )
}
