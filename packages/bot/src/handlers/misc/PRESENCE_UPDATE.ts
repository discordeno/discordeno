import type { DiscordGatewayPayload, DiscordPresenceUpdate } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handlePresenceUpdate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  bot.events.presenceUpdate?.(bot.transformers.presence(bot, data.d as DiscordPresenceUpdate))
}
