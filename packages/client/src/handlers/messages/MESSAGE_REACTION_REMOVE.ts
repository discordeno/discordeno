import {
  DiscordGatewayPayload,
  DiscordMessageReactionRemove
} from '@discordeno/types'
import { Client } from '../../client.js'

export async function handleMessageReactionRemove (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordMessageReactionRemove

  client.events.reactionRemove(client, {
    userId: client.transformers.snowflake(payload.user_id),
    channelId: client.transformers.snowflake(payload.channel_id),
    messageId: client.transformers.snowflake(payload.message_id),
    guildId: payload.guild_id
      ? client.transformers.snowflake(payload.guild_id)
      : undefined,
    emoji: client.transformers.emoji(client, payload.emoji)
  })
}
