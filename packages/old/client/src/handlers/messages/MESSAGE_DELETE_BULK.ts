import type {
  DiscordGatewayPayload,
  DiscordMessageDeleteBulk
} from '@discordeno/types'
import type { Client } from '../../client.js'

export async function handleMessageDeleteBulk (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordMessageDeleteBulk

  const channelId = client.transformers.snowflake(payload.channel_id)
  const guildId = payload.guild_id
    ? client.transformers.snowflake(payload.guild_id)
    : undefined

  client.events.messageDeleteBulk(client, {
    ids: payload.ids.map((id) => client.transformers.snowflake(id)),
    channelId,
    guildId
  })
}
