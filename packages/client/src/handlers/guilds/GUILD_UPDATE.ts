import type { DiscordGatewayPayload, DiscordGuild } from '@discordeno/types'
import type { Client } from '../../client.js'

export function handleGuildUpdate (
  client: Client,
  data: DiscordGatewayPayload,
  shardId: number
): void {
  const payload = data.d as DiscordGuild

  client.events.guildUpdate(
    client,
    client.transformers.guild(client, { guild: payload, shardId })
  )
}
