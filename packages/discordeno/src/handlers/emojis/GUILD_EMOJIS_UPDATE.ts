import type { Bot } from '../../bot.js'
import { DiscordGatewayPayload, DiscordGuildEmojisUpdate } from '../../types/discord.js'
import { Collection } from '../../util/collection.js'

export async function handleGuildEmojisUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordGuildEmojisUpdate

  bot.events.guildEmojisUpdate(bot, {
    guildId: bot.transformers.snowflake(payload.guild_id),
    emojis: new Collection(payload.emojis.map((emoji) => [bot.transformers.snowflake(emoji.id!), emoji]))
  })
}
