import type { DiscordGatewayPayload, DiscordGuildBanAddRemove } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleGuildBanRemove(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.guildBanRemove) return

  const payload = data.d as DiscordGuildBanAddRemove

  await bot.events.guildBanRemove(bot.transformers.user(bot, payload.user), bot.transformers.snowflake(payload.guild_id))
}
