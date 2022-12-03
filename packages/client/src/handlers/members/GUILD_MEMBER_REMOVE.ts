import {
  DiscordGatewayPayload,
  DiscordGuildMemberRemove
} from '@discordeno/types'
import { Client } from '../../client.js'

export async function handleGuildMemberRemove (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordGuildMemberRemove
  const guildId = client.transformers.snowflake(payload.guild_id)
  const user = client.transformers.user(client, payload.user)

  client.events.guildMemberRemove(client, user, guildId)
}
