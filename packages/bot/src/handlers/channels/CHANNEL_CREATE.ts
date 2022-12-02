import { DiscordChannel, DiscordGatewayPayload } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleChannelCreate (
  bot: Bot,
  payload: DiscordGatewayPayload
): Promise<void> {
  const channel = bot.transformers.channel(bot, {
    channel: payload.d as DiscordChannel
  })

  bot.events.channelCreate(bot, channel)
}
