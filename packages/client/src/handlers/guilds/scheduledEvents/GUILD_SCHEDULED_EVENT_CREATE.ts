import {
  DiscordGatewayPayload,
  DiscordScheduledEvent
} from '@discordeno/types'
import type { Client } from '../../../client.js'

export function handleGuildScheduledEventCreate (
  client: Client,
  data: DiscordGatewayPayload,
  shardId: number
): void {
  const payload = data.d as DiscordScheduledEvent
  client.events.scheduledEventCreate(
    client,
    client.transformers.scheduledEvent(client, payload)
  )
}
