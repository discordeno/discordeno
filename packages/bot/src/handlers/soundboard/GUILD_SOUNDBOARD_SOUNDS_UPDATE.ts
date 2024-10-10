import type { DiscordGatewayPayload, DiscordSoundboardSound } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleGuildSoundboardSoundsUpdate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.soundboardSoundsUpdate) return

  const payload = data.d as DiscordSoundboardSound[]

  bot.events.soundboardSoundsUpdate(payload.map((sound) => bot.transformers.soundboardSound(bot, sound)))
}
