import type { DiscordGatewayPayload, DiscordSoundboardSoundDelete } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleGuildSoundboardSoundDelete(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.soundboardSoundDelete) return

  const payload = data.d as DiscordSoundboardSoundDelete

  bot.events.soundboardSoundDelete({
    guildId: bot.transformers.snowflake(payload.guild_id),
    soundId: bot.transformers.snowflake(payload.sound_id),
  })
}
