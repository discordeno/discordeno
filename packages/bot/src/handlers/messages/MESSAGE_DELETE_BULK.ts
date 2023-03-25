import type { DiscordGatewayPayload, DiscordMessageDeleteBulk } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleMessageDeleteBulk(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordMessageDeleteBulk

  const channelId = bot.transformers.snowflake(payload.channel_id)
  const guildId = payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined

  bot.events.messageDeleteBulk?.({
    ids: payload.ids.map((id) => bot.transformers.snowflake(id)),
    channelId: bot.transformers.snowflake(payload.channel_id),
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
  })
}
