import type { Bot } from '../../bot.js'
import { DiscordChannel, DiscordGatewayPayload } from '../../types/discord.js'

export async function handleChannelCreate(bot: Bot, payload: DiscordGatewayPayload) {
  const channel = bot.transformers.channel(bot, { channel: payload.d as DiscordChannel })

  bot.events.channelCreate(bot, channel)
}
