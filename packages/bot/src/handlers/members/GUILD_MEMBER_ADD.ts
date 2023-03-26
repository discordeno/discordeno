import type { DiscordGatewayPayload, DiscordGuildMemberAdd } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleGuildMemberAdd(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  const payload = data.d as DiscordGuildMemberAdd
  const guildId = bot.transformers.snowflake(payload.guild_id)
  const user = bot.transformers.user(bot, payload.user)
  const member = bot.transformers.member(bot, payload, guildId, user.id)
  bot.events.guildMemberAdd?.(member, user)
}
