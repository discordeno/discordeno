import { DiscordGatewayPayload, DiscordGuildBanAddRemove } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleGuildBanAdd (bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordGuildBanAddRemove
  bot.events.guildBanAdd(bot, bot.transformers.user(bot, payload.user), bot.transformers.snowflake(payload.guild_id))
}
