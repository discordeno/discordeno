import type {
  DiscordGatewayPayload,
  DiscordMessageDelete
} from '@discordeno/types'
import type { Client } from '../../client.js'

export async function handleMessageDelete (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordMessageDelete

  client.events.messageDelete(client, {
    id: client.transformers.snowflake(payload.id),
    channelId: client.transformers.snowflake(payload.channel_id),
    guildId: payload.guild_id
      ? client.transformers.snowflake(payload.guild_id)
      : undefined
  })
}
