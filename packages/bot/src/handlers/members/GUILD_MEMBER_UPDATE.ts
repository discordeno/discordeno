import type { DiscordGatewayPayload, DiscordGuildMemberUpdate } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleGuildMemberUpdate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.guildMemberUpdate) return

  const payload = data.d as DiscordGuildMemberUpdate

  const user = bot.transformers.user(bot, payload.user)
  // @ts-expect-error Flags in the update are nullable, while on the member they are be always present
  bot.events.guildMemberUpdate(bot.transformers.member(bot, payload, bot.transformers.snowflake(payload.guild_id), user.id), user)
}
