import type { DiscordGatewayPayload, DiscordGuildBanAddRemove } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleGuildBanAdd(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.guildBanAdd) return

  const payload = data.d as DiscordGuildBanAddRemove
  bot.events.guildBanAdd(bot.transformers.user(bot, payload.user), bot.transformers.snowflake(payload.guild_id))
}
