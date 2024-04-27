import type { DiscordGatewayPayload, DiscordGuildMemberRemove } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleGuildMemberRemove(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.guildMemberRemove) return

  const payload = data.d as DiscordGuildMemberRemove
  const guildId = bot.transformers.snowflake(payload.guild_id)
  const user = bot.transformers.user(bot, payload.user)

  bot.events.guildMemberRemove(user, guildId)
}
