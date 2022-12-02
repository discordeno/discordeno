import {
  DiscordGatewayPayload,
  DiscordGuildRoleDelete
} from '@discordeno/types'
import { Bot } from '../../bot.js'

export async function handleGuildRoleDelete (
  bot: Bot,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordGuildRoleDelete
  bot.events.roleDelete(bot, {
    roleId: bot.transformers.snowflake(payload.role_id),
    guildId: bot.transformers.snowflake(payload.guild_id)
  })
}
