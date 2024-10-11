import type { DiscordGatewayPayload, DiscordSubscription } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleSubscriptionCreate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.subscriptionCreate) return

  const payload = data.d as DiscordSubscription
  bot.events.subscriptionCreate(bot.transformers.subscription(bot, payload))
}
