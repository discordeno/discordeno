import type {
  DiscordGatewayPayload,
  DiscordVoiceState
} from '@discordeno/types'
import type { Client } from '../../client.js'

export async function handleVoiceStateUpdate (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordVoiceState
  if (!payload.guild_id) return

  const guildId = client.transformers.snowflake(payload.guild_id)

  client.events.voiceStateUpdate(
    client,
    client.transformers.voiceState(client, { voiceState: payload, guildId })
  )
}
