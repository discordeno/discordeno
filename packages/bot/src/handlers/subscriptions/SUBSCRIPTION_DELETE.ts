import type { DiscordGatewayPayload, DiscordSubscription } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleSubscriptionDelete(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.subscriptionDelete) return

  const payload = data.d as DiscordSubscription
  bot.events.subscriptionDelete(bot.transformers.subscription(bot, payload))
}
