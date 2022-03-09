import { Bot } from "../bot.ts";
import { DiscordVoiceState } from "../types/discord.ts";
import { VoiceState } from "../types/discordeno.ts";
import { VoiceStateToggles } from "./toggles/voice.ts";

export function transformVoiceState(
  bot: Bot,
  payload: { voiceState: DiscordVoiceState } & { guildId: bigint },
): VoiceState {
  return {
    toggles: new VoiceStateToggles(payload.voiceState),

    requestToSpeakTimestamp: payload.voiceState.request_to_speak_timestamp
      ? Date.parse(payload.voiceState.request_to_speak_timestamp)
      : undefined,
    sessionId: payload.voiceState.session_id,

    channelId: payload.voiceState.channel_id ? bot.transformers.snowflake(payload.voiceState.channel_id) : undefined,
    guildId: payload.guildId ||
      (payload.voiceState.guild_id ? bot.transformers.snowflake(payload.voiceState.guild_id) : 0n),
    userId: payload.voiceState.user_id ? bot.transformers.snowflake(payload.voiceState.user_id) : 0n,
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
  /** The unique session id */
  sessionId: string;
}
