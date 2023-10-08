import type { DiscordChannel, DiscordGatewayPayload } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleChannelUpdate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (bot.events.channelUpdate === undefined) return

  const payload = data.d as DiscordChannel
  const channel = bot.transformers.channel(bot, { channel: payload })

  bot.events.channelUpdate(channel)
}
