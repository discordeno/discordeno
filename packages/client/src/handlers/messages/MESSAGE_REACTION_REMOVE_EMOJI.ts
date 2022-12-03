import {
  DiscordGatewayPayload,
  DiscordMessageReactionRemoveEmoji
} from '@discordeno/types'
import { Client } from '../../client.js'

export async function handleMessageReactionRemoveEmoji (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordMessageReactionRemoveEmoji

  client.events.reactionRemoveEmoji(client, {
    channelId: client.transformers.snowflake(payload.channel_id),
    messageId: client.transformers.snowflake(payload.message_id),
    guildId: payload.guild_id
      ? client.transformers.snowflake(payload.guild_id)
      : undefined,
    emoji: client.transformers.emoji(client, payload.emoji)
  })
}
