import type { DiscordGatewayPayload, DiscordGuildRoleDelete } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleGuildRoleDelete(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.roleDelete) return

  const payload = data.d as DiscordGuildRoleDelete
  bot.events.roleDelete({
    roleId: bot.transformers.snowflake(payload.role_id),
    guildId: bot.transformers.snowflake(payload.guild_id),
  })
}
