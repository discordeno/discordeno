import { DiscordChannel, DiscordGatewayPayload } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleChannelUpdate (bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordChannel
  const channel = bot.transformers.channel(bot, { channel: payload })

  bot.events.channelUpdate(bot, channel)
}
