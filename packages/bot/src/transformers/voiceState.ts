import type { BigString, DiscordVoiceState } from '@discordeno/types'
import type { InternalBot, VoiceState } from '../index.js'
import { VoiceStateToggles } from './toggles/voice.js'

export function transformVoiceState(
  bot: InternalBot,
  payload: { voiceState: DiscordVoiceState; guildId: BigString },
): typeof bot.transformers.$inferredTypes.voiceState {
  const props = bot.transformers.desiredProperties.voiceState
  const voiceState = {} as VoiceState

  if (props.requestToSpeakTimestamp && payload.voiceState.request_to_speak_timestamp)
    voiceState.requestToSpeakTimestamp = Date.parse(payload.voiceState.request_to_speak_timestamp)
  if (props.channelId && payload.voiceState.channel_id) voiceState.channelId = bot.transformers.snowflake(payload.voiceState.channel_id)
  if (props.guildId) voiceState.guildId = bot.transformers.snowflake(payload.guildId)
  if (props.toggles) voiceState.toggles = new VoiceStateToggles(payload.voiceState)
  if (props.sessionId) voiceState.sessionId = payload.voiceState.session_id
  if (props.userId && payload.voiceState.user_id) voiceState.userId = bot.transformers.snowflake(payload.voiceState.user_id) ?? 0n

  return bot.transformers.customizers.voiceState(bot, payload.voiceState, voiceState)
}
