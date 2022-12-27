import type {
  DiscordAutoModerationRule,
  DiscordGatewayPayload
} from '@discordeno/types'
import type { Client } from '../../../client.js'

/** Requires the MANAGE_GUILD permission. */
export function handleAutoModerationRuleDelete (
  client: Client,
  data: DiscordGatewayPayload,
  shardId: number
): void {
  const payload = data.d as DiscordAutoModerationRule
  client.events.automodRuleDelete(
    client,
    client.transformers.automodRule(client, payload)
  )
}
