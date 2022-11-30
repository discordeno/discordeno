import { Bot } from '../../bot.js'
import { DiscordChannel, DiscordGatewayPayload } from '../../types/discord.js'

export async function handleThreadCreate (bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordChannel

  bot.events.threadCreate(bot, bot.transformers.channel(bot, { channel: payload }))
}
