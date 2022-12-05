import type { DiscordVoiceState, Optionalize } from '@discordeno/types'
import type { RestManager } from '../restManager.js'
import { VoiceStateToggles } from './toggles/voice.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformVoiceState (
  rest: RestManager,
  payload: { voiceState: DiscordVoiceState } & { guildId: bigint }
) {
  const voiceState = {
    toggles: new VoiceStateToggles(payload.voiceState),

    requestToSpeakTimestamp: payload.voiceState.request_to_speak_timestamp
      ? Date.parse(payload.voiceState.request_to_speak_timestamp)
      : undefined,
    sessionId: payload.voiceState.session_id,

    channelId: payload.voiceState.channel_id
      ? rest.transformers.snowflake(payload.voiceState.channel_id)
      : undefined,
    guildId:
      payload.guildId ||
      (payload.voiceState.guild_id
        ? rest.transformers.snowflake(payload.voiceState.guild_id)
        : 0n),
    userId: payload.voiceState.user_id
      ? rest.transformers.snowflake(payload.voiceState.user_id)
      : 0n
  }

  return voiceState as Optionalize<typeof voiceState>
}

export interface VoiceState extends ReturnType<typeof transformVoiceState> {}
