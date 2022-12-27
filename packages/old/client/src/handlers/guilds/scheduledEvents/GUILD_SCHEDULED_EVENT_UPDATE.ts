import type {
  DiscordGatewayPayload,
  DiscordScheduledEvent
} from '@discordeno/types'
import type { Client } from '../../../client.js'

export function handleGuildScheduledEventUpdate (
  client: Client,
  data: DiscordGatewayPayload
): void {
  const payload = data.d as DiscordScheduledEvent
  client.events.scheduledEventUpdate(
    client,
    client.transformers.scheduledEvent(client, payload)
  )
}
