import type {
  DiscordGatewayPayload,
  DiscordScheduledEventUserAdd
} from '@discordeno/types'
import type { Client } from '../../../client.js'

export function handleGuildScheduledEventUserAdd (
  client: Client,
  data: DiscordGatewayPayload
): unknown {
  const payload = data.d as DiscordScheduledEventUserAdd

  return client.events.scheduledEventUserAdd(client, {
    guildScheduledEventId: client.transformers.snowflake(
      payload.guild_scheduled_event_id
    ),
    userId: client.transformers.snowflake(payload.user_id),
    guildId: client.transformers.snowflake(payload.guild_id)
  })
}
