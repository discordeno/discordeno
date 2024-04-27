import type { DiscordVoiceState } from '@discordeno/types'
import type { Bot } from '../index.js'
import { VoiceStateToggles } from './toggles/voice.js'

export function transformVoiceState(bot: Bot, payload: { voiceState: DiscordVoiceState } & { guildId: bigint }): VoiceState {
  const props = bot.transformers.desiredProperties.voiceState
  const voiceState = {} as VoiceState

  if (props.requestToSpeakTimestamp && payload.voiceState.request_to_speak_timestamp)
    voiceState.requestToSpeakTimestamp = Date.parse(payload.voiceState.request_to_speak_timestamp)
  if (props.channelId && payload.voiceState.channel_id) voiceState.channelId = bot.transformers.snowflake(payload.voiceState.channel_id)
  if (props.guildId) voiceState.guildId = payload.guildId
  if (props.toggles) voiceState.toggles = new VoiceStateToggles(payload.voiceState)
  if (props.sessionId) voiceState.sessionId = payload.voiceState.session_id
  if (props.userId && payload.voiceState.user_id) voiceState.userId = bot.transformers.snowflake(payload.voiceState.user_id) ?? 0n

  return bot.transformers.customizers.voiceState(bot, payload.voiceState, voiceState)
}

export interface VoiceState {
  requestToSpeakTimestamp?: number
  channelId?: bigint
  guildId: bigint
  toggles: VoiceStateToggles
  sessionId: string
  userId: bigint
}
