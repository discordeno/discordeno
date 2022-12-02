import {
  DiscordGatewayPayload,
  DiscordGuildRoleCreate
} from '@discordeno/types'
import { Bot } from '../../bot.js'

export async function handleGuildRoleCreate (
  bot: Bot,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordGuildRoleCreate
  bot.events.roleCreate(
    bot,
    bot.transformers.role(bot, {
      role: payload.role,
      guildId: bot.transformers.snowflake(payload.guild_id)
    })
  )
}
