import type {
  DiscordGatewayPayload,
  DiscordScheduledEvent
} from '@discordeno/types'
import type { Client } from '../../../client.js'

export function handleGuildScheduledEventDelete (
  client: Client,
  data: DiscordGatewayPayload
): void {
  const payload = data.d as DiscordScheduledEvent
  client.events.scheduledEventDelete(
    client,
    client.transformers.scheduledEvent(client, payload)
  )
}
