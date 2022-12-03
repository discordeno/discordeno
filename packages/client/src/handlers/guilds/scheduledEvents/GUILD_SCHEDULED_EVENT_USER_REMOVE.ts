import {
  DiscordGatewayPayload,
  DiscordScheduledEventUserRemove
} from '@discordeno/types'
import type { Client } from '../../../client.js'

export function handleGuildScheduledEventUserRemove (
  client: Client,
  data: DiscordGatewayPayload
): unknown {
  const payload = data.d as DiscordScheduledEventUserRemove

  return client.events.scheduledEventUserRemove(client, {
    guildScheduledEventId: client.transformers.snowflake(
      payload.guild_scheduled_event_id
    ),
    userId: client.transformers.snowflake(payload.user_id),
    guildId: client.transformers.snowflake(payload.guild_id)
  })
}
