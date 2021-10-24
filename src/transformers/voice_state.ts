import type { VoiceState } from "../types/voice/voice_state.ts";
import { Bot } from "../bot.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";

export function transformVoiceState(
  bot: Bot,
  payload: { voiceState: SnakeCasedPropertiesDeep<VoiceState> } & { guildId: bigint }
) {
  return {
    bitfield:
      (payload.voiceState.deaf ? 1n : 0n) |
      (payload.voiceState.mute ? 2n : 0n) |
      (payload.voiceState.self_deaf ? 4n : 0n) |
      (payload.voiceState.self_mute ? 8n : 0n) |
      (payload.voiceState.self_stream ? 16n : 0n) |
      (payload.voiceState.self_video ? 32n : 0n) |
      (payload.voiceState.suppress ? 64n : 0n),

    requestToSpeakTimestamp: payload.voiceState.request_to_speak_timestamp
      ? Date.parse(payload.voiceState.request_to_speak_timestamp)
      : undefined,
    sessionId: payload.voiceState.session_id,

    channelId: payload.voiceState.channel_id ? bot.transformers.snowflake(payload.voiceState.channel_id) : undefined,
    guildId:
      payload.guildId || (payload.voiceState.guild_id ? bot.transformers.snowflake(payload.voiceState.guild_id) : 0n),
    userId:
      payload.guildId || (payload.voiceState.user_id ? bot.transformers.snowflake(payload.voiceState.user_id) : 0n),
  };
}

export interface DiscordenoVoiceState {
  /** The guild id */
  guildId: bigint;
  /** The channel id this user is connected to */
  channelId?: bigint;
  /** The user id this voice state is for */
  userId: bigint;
  /** Holds all the boolean toggles. */
  bitfield: bigint;
  /** The time at which the user requested to speak */
  requestToSpeakTimestamp?: number;
}
