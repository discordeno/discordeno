import {
  DiscordGatewayPayload,
  DiscordGuildBanAddRemove
} from '@discordeno/types'
import type { Client } from '../../client.js'

export async function handleGuildBanRemove (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordGuildBanAddRemove

  await client.events.guildBanRemove(
    client,
    client.transformers.user(client, payload.user),
    client.transformers.snowflake(payload.guild_id)
  )
}
