import {
  DiscordGatewayPayload,
  DiscordGuildEmojisUpdate
} from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { Bot } from '../../bot.js'

export async function handleGuildEmojisUpdate (
  bot: Bot,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordGuildEmojisUpdate

  bot.events.guildEmojisUpdate(bot, {
    guildId: bot.transformers.snowflake(payload.guild_id),
    emojis: new Collection(
      payload.emojis.map((emoji) => [
        bot.transformers.snowflake(emoji.id!),
        emoji
      ])
    )
  })
}
