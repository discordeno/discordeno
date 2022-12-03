import { DiscordGatewayPayload, DiscordWebhookUpdate } from '@discordeno/types'
import { Client } from '../../client.js'

export function handleWebhooksUpdate (
  client: Client,
  data: DiscordGatewayPayload
): void {
  const payload = data.d as DiscordWebhookUpdate
  client.events.webhooksUpdate(client, {
    channelId: client.transformers.snowflake(payload.channel_id),
    guildId: client.transformers.snowflake(payload.guild_id)
  })
}
