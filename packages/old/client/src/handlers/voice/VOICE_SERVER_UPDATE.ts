import type {
  DiscordGatewayPayload,
  DiscordVoiceServerUpdate
} from '@discordeno/types'
import type { Client } from '../../client.js'

export async function handleVoiceServerUpdate (
  client: Client,
  data: DiscordGatewayPayload
): Promise<void> {
  const payload = data.d as DiscordVoiceServerUpdate

  client.events.voiceServerUpdate(client, {
    token: payload.token,
    guildId: client.transformers.snowflake(payload.guild_id),
    endpoint: payload.endpoint ?? undefined
  })
}
