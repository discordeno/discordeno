import type { DiscordGatewayPayload, DiscordGuildRoleUpdate } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleGuildRoleUpdate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.roleUpdate) return

  const payload = data.d as DiscordGuildRoleUpdate

  bot.events.roleUpdate(
    bot.transformers.role(bot, {
      role: payload.role,
      guildId: bot.transformers.snowflake(payload.guild_id),
    }),
  )
}
