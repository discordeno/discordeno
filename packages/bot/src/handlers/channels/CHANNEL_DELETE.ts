import { DiscordChannel, DiscordGatewayPayload } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleChannelDelete (
  bot: Bot,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordChannel
  if (!payload.guild_id) return

  bot.events.channelDelete(
    bot,
    bot.transformers.channel(bot, {
      channel: payload,
      guildId: payload.guild_id
        ? bot.transformers.snowflake(payload.guild_id)
        : undefined
    })
  )
}
