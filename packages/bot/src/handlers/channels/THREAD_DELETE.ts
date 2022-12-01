import { DiscordChannel, DiscordGatewayPayload } from '@discordeno/types'
import { Bot } from '../../bot.js'

export async function handleThreadDelete (bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordChannel
  bot.events.threadDelete(bot, bot.transformers.channel(bot, { channel: payload }))
}
