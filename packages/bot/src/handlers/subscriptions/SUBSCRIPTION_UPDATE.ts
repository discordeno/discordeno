import type { DiscordGatewayPayload, DiscordSubscription } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleSubscriptionUpdate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.subscriptionUpdate) return

  const payload = data.d as DiscordSubscription
  bot.events.subscriptionUpdate(bot.transformers.subscription(bot, payload))
}
