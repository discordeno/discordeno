import { Bot } from '../../bot.js'
import { DiscordGatewayPayload, DiscordGuildRoleUpdate } from '../../types/discord.js'

export async function handleGuildRoleUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordGuildRoleUpdate

  bot.events.roleUpdate(
    bot,
    bot.transformers.role(bot, { role: payload.role, guildId: bot.transformers.snowflake(payload.guild_id) })
  )
}
