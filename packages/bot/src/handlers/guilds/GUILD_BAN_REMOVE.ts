import type { Bot } from '../../bot.js'
import { DiscordGatewayPayload, DiscordGuildBanAddRemove } from '../../types/discord.js'

export async function handleGuildBanRemove (bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordGuildBanAddRemove

  await bot.events.guildBanRemove(
    bot,
    bot.transformers.user(bot, payload.user),
    bot.transformers.snowflake(payload.guild_id)
  )
}
