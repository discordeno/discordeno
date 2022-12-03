import {
  DiscordGatewayPayload,
  DiscordMessageReactionRemoveAll
} from '@discordeno/types'
import { Client } from '../../client.js'

export async function handleMessageReactionRemoveAll (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordMessageReactionRemoveAll

  client.events.reactionRemoveAll(client, {
    channelId: client.transformers.snowflake(payload.channel_id),
    messageId: client.transformers.snowflake(payload.message_id),
    guildId: payload.guild_id
      ? client.transformers.snowflake(payload.guild_id)
      : undefined
  })
}
