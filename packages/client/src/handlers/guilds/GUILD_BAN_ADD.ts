import {
  DiscordGatewayPayload,
  DiscordGuildBanAddRemove
} from '@discordeno/types'
import type { Client } from '../../client.js'

export async function handleGuildBanAdd (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordGuildBanAddRemove
  client.events.guildBanAdd(
    client,
    client.transformers.user(client, payload.user),
    client.transformers.snowflake(payload.guild_id)
  )
}
