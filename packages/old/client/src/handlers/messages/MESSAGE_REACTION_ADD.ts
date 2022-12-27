import type {
  DiscordGatewayPayload,
  DiscordMessageReactionAdd
} from '@discordeno/types'
import type { Client } from '../../client.js'

export async function handleMessageReactionAdd (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordMessageReactionAdd

  const guildId = payload.guild_id
    ? client.transformers.snowflake(payload.guild_id)
    : undefined
  const userId = client.transformers.snowflake(payload.user_id)
  client.events.reactionAdd(client, {
    userId,
    channelId: client.transformers.snowflake(payload.channel_id),
    messageId: client.transformers.snowflake(payload.message_id),
    guildId,
    member:
      payload.member && guildId
        ? client.transformers.member(client, payload.member, guildId, userId)
        : undefined,
    user: payload.member
      ? client.transformers.user(client, payload.member.user)
      : undefined,
    emoji: client.transformers.emoji(client, payload.emoji)
  })
}
