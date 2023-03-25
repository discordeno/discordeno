import type { DiscordChannel, DiscordenoShard, DiscordGatewayPayload } from '@discordeno/bot'
import type { Bot } from '../../index.js'

export async function handleChannelCreate(bot: Bot, payload: DiscordGatewayPayload, shard: DiscordenoShard) {
  const channel = bot.transformers.channel(bot, {
    channel: payload.d as DiscordChannel,
  })

  bot.events.channelCreate?.(channel)
}
