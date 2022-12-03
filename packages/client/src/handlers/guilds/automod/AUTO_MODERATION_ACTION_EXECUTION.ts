import {
  DiscordAutoModerationActionExecution,
  DiscordGatewayPayload
} from '@discordeno/types'
import type { Client } from '../../../client.js'

/** Requires the MANAGE_GUILD permission. */
export function handleAutoModerationActionExecution (
  client: Client,
  data: DiscordGatewayPayload,
  shardId: number
): void {
  const payload = data.d as DiscordAutoModerationActionExecution
  client.events.automodActionExecution(
    client,
    client.transformers.automodActionExecution(client, payload)
  )
}
