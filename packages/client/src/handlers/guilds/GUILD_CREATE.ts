import { DiscordGatewayPayload, DiscordGuild } from '@discordeno/types'
import type { Client } from '../../client.js'

export function handleGuildCreate (
  client: Client,
  data: DiscordGatewayPayload,
  shardId: number
): void {
  const payload = data.d as DiscordGuild
  client.events.guildCreate(
    client,
    client.transformers.guild(client, { guild: payload, shardId })
  )
}
