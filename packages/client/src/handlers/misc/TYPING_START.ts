import { DiscordGatewayPayload, DiscordTypingStart } from '@discordeno/types'
import { Client } from '../../client.js'

export function handleTypingStart (
  client: Client,
  data: DiscordGatewayPayload
): void {
  const payload = data.d as DiscordTypingStart

  const guildId = payload.guild_id
    ? client.transformers.snowflake(payload.guild_id)
    : undefined
  const userId = client.transformers.snowflake(payload.user_id)

  client.events.typingStart(client, {
    guildId,
    channelId: client.transformers.snowflake(payload.channel_id),
    userId,
    timestamp: payload.timestamp,
    member:
      payload.member && guildId
        ? client.transformers.member(client, payload.member, guildId, userId)
        : undefined
  })
}
