import type {
  DiscordGatewayPayload,
  DiscordStageInstance
} from '@discordeno/types'
import type { Client } from '../../client.js'

export function handleStageInstanceCreate (
  client: Client,
  data: DiscordGatewayPayload
): void {
  const payload = data.d as DiscordStageInstance

  client.events.stageInstanceCreate(client, {
    id: client.transformers.snowflake(payload.id),
    guildId: client.transformers.snowflake(payload.guild_id),
    channelId: client.transformers.snowflake(payload.channel_id),
    topic: payload.topic
  })
}
