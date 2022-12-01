import {
  DiscordGatewayPayload,
  DiscordGuildRoleUpdate
} from '@discordeno/types'
import { Bot } from '../../bot.js'

export async function handleGuildRoleUpdate (
  bot: Bot,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordGuildRoleUpdate

  bot.events.roleUpdate(
    bot,
    bot.transformers.role(bot, {
      role: payload.role,
      guildId: bot.transformers.snowflake(payload.guild_id)
    })
  )
}
