import type { DiscordGatewayPayload, DiscordGuildMemberAdd } from '@discordeno/types'
import type { InternalBot } from '../../index.js'

export async function handleGuildMemberAdd(bot: InternalBot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.guildMemberAdd) return

  const payload = data.d as DiscordGuildMemberAdd
  const guildId = bot.transformers.snowflake(payload.guild_id)
  const user = bot.transformers.user(bot, payload.user)
  const member = bot.transformers.member(bot, payload, guildId, user.id)
  bot.events.guildMemberAdd(member, user)
}
