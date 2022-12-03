import {
  DiscordGatewayPayload,
  DiscordGuildMemberAdd
} from '@discordeno/types'
import { Client } from '../../client.js'

export async function handleGuildMemberAdd (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordGuildMemberAdd
  const guildId = client.transformers.snowflake(payload.guild_id)
  const user = client.transformers.user(client, payload.user)
  const member = client.transformers.member(client, payload, guildId, user.id)
  client.events.guildMemberAdd(client, member, user)
}
