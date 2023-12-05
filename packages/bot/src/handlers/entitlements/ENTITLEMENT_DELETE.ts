import type { DiscordGatewayPayload } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleEntitlementDelete(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.entitlementDelete) return

  const payload = data.d as string
  bot.events.entitlementDelete(bot.transformers.snowflake(payload))
}
