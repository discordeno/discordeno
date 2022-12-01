import { Bot } from '../../bot.js'
import { DiscordGatewayPayload, DiscordUser } from '../../types/discord.js'

export async function handleUserUpdate (bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordUser
  bot.events.botUpdate(bot, bot.transformers.user(bot, payload))
}
