import type { Bot, DiscordChannel, DiscordGatewayPayload } from '../../index.js'

export async function handleChannelCreate(bot: Bot, payload: DiscordGatewayPayload, shardId: number): Promise<void> {
  const data = payload.d as DiscordChannel
  const channel = bot.transformers.channel(bot, {
    channel: data,
    guildId: data.guild_id ? bot.transformers.snowflake(data.guild_id) : undefined,
  })

  bot.events.channelCreate?.(channel)
}
