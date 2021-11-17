import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import type { VoiceState } from "../../types/voice/voiceState.ts";
import { Bot } from "../../bot.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleVoiceStateUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<VoiceState>;
  if (!payload.guild_id) return;

  const guildId = bot.transformers.snowflake(payload.guild_id);
  const userId = bot.transformers.snowflake(payload.user_id);

  bot.events.voiceStateUpdate(bot, {
    guildId,
    userId,
    channelId: payload.channel_id ? bot.transformers.snowflake(payload.channel_id) : undefined,
    member: payload.member ? bot.transformers.member(bot, payload.member, guildId, userId) : undefined,
    user: payload.member ? bot.transformers.user(bot, payload.member.user) : undefined,
    sessionId: payload.session_id,
    deaf: payload.deaf,
    mute: payload.mute,
    selfDeaf: payload.self_deaf,
    selfMute: payload.self_mute,
    selfStream: payload.self_stream,
    selfVideo: payload.self_video,
    suppress: payload.suppress,
    requestToSpeakTimestamp: payload.request_to_speak_timestamp
      ? Date.parse(payload.request_to_speak_timestamp)
      : undefined,
  });
}
