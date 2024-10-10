import type { DiscordGatewayPayload, DiscordSoundboardSound } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleGuildSoundboardSoundUpdate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.soundboardSoundUpdate) return

  const payload = data.d as DiscordSoundboardSound

  bot.events.soundboardSoundUpdate(bot.transformers.soundboardSound(bot, payload))
}
