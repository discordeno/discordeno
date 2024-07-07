import type { Bot, DiscordGatewayPayload, DiscordGuildStickersUpdate } from '../../index.js'

export async function handleGuildStickersUpdate(bot: Bot, data: DiscordGatewayPayload, _shardId: number): Promise<void> {
  if (!bot.events.guildStickersUpdate) return

  const payload = data.d as DiscordGuildStickersUpdate

  bot.events.guildStickersUpdate({
    guildId: bot.transformers.snowflake(payload.guild_id),
    stickers: payload.stickers.map((sticker) => {
      sticker.guild_id = payload.guild_id
      return bot.transformers.sticker(bot, sticker)
    }),
  })
}
