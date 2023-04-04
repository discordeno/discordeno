import type { DiscordGatewayPayload, DiscordGuildMemberUpdate } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleGuildMemberUpdate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  const payload = data.d as DiscordGuildMemberUpdate

  const user = bot.transformers.user(bot, payload.user)
  bot.events.guildMemberUpdate?.(bot.transformers.member(bot, payload, bot.transformers.snowflake(payload.guild_id), user.id), user)
}
