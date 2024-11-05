import type { DiscordGatewayPayload, DiscordSoundboardSoundsUpdate } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleGuildSoundboardSoundsUpdate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.soundboardSoundsUpdate) return

  const payload = data.d as DiscordSoundboardSoundsUpdate

  bot.events.soundboardSoundsUpdate({
    guildId: bot.transformers.snowflake(payload.guild_id),
    soundboardSounds: payload.soundboard_sounds.map((sound) => bot.transformers.soundboardSound(bot, sound)),
  })
}
