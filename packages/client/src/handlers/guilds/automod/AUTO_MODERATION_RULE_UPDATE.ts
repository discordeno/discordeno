import {
  DiscordAutoModerationRule,
  DiscordGatewayPayload
} from '@discordeno/types'
import type { Client } from '../../../client.js'

/** Requires the MANAGE_GUILD permission. */
export function handleAutoModerationRuleUpdate (
  client: Client,
  data: DiscordGatewayPayload,
  shardId: number
): void {
  const payload = data.d as DiscordAutoModerationRule
  client.events.automodRuleUpdate(
    client,
    client.transformers.automodRule(client, payload)
  )
}
