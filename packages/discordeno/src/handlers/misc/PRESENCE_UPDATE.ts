import { Bot } from '../../bot.js'
import { DiscordGatewayPayload, DiscordPresenceUpdate } from '../../types/discord.js'

export async function handlePresenceUpdate(bot: Bot, data: DiscordGatewayPayload) {
  bot.events.presenceUpdate(bot, bot.transformers.presence(bot, data.d as DiscordPresenceUpdate))
}
