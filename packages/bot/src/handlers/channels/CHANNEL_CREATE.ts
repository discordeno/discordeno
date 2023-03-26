import type { DiscordChannel, DiscordGatewayPayload } from '@discordeno/bot'
import type { Bot } from '../../index.js'

export async function handleChannelCreate(bot: Bot, payload: DiscordGatewayPayload, shardId: number): Promise<void> {
  const channel = bot.transformers.channel(bot, {
    channel: payload.d as DiscordChannel,
  })

  bot.events.channelCreate?.(channel)
}
