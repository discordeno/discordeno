import type { DiscordGatewayPayload, DiscordSoundboardSound } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleGuildSoundboardSoundCreate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.soundboardSoundCreate) return

  const payload = data.d as DiscordSoundboardSound

  bot.events.soundboardSoundCreate(bot.transformers.soundboardSound(bot, payload))
}
