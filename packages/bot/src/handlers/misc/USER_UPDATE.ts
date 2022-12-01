import { DiscordGatewayPayload, DiscordUser } from '@discordeno/types'
import { Bot } from '../../bot.js'

export async function handleUserUpdate (bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordUser
  bot.events.botUpdate(bot, bot.transformers.user(bot, payload))
}
