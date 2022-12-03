import { DiscordGatewayPayload, DiscordStageInstance } from '@discordeno/types'
import type { Client } from '../../client.js'

export function handleStageInstanceUpdate (
  client: Client,
  data: DiscordGatewayPayload
): void {
  const payload = data.d as DiscordStageInstance

  client.events.stageInstanceUpdate(client, {
    id: client.transformers.snowflake(payload.id),
    guildId: client.transformers.snowflake(payload.guild_id),
    channelId: client.transformers.snowflake(payload.channel_id),
    topic: payload.topic
  })
}
