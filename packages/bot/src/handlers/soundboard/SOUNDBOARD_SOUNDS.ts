import type { DiscordGatewayPayload, DiscordSoundboardSounds } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleSoundboardSounds(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.soundboardSounds) return

  const payload = data.d as DiscordSoundboardSounds

  bot.events.soundboardSounds({
    guildId: bot.transformers.snowflake(payload.guild_id),
    soundboardSounds: payload.soundboard_sounds.map((sound) => bot.transformers.soundboardSound(bot, sound)),
  })
}
