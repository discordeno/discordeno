import type { Bot, DiscordChannel, DiscordGatewayPayload } from '../../index.js'

export async function handleChannelCreate(bot: Bot, payload: DiscordGatewayPayload, shardId: number): Promise<void> {
  const channel = bot.transformers.channel(bot, {
    channel: payload.d as DiscordChannel,
  })

  bot.events.channelCreate?.(channel)
}
