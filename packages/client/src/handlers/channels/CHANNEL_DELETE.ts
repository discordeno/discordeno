import { DiscordChannel, DiscordGatewayPayload } from '@discordeno/types'
import type { Client } from '../../client.js'

export async function handleChannelDelete (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordChannel
  if (!payload.guild_id) return

  client.events.channelDelete(
    client,
    client.transformers.channel(client, {
      channel: payload,
      guildId: payload.guild_id
        ? client.transformers.snowflake(payload.guild_id)
        : undefined
    })
  )
}
