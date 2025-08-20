import type { DiscordChannel, DiscordGatewayPayload } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleChannelDelete(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.channelDelete) return

  const payload = data.d as DiscordChannel

  bot.events.channelDelete(bot.transformers.channel(bot, payload, { guildId: payload.guild_id }))
}
