import type { BigString, DiscordVoiceState } from '@discordeno/types'
import type { Bot, DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties, VoiceState } from '../index.js'
import { VoiceStateToggles } from './toggles/voice.js'

export function transformVoiceState(bot: Bot, payload: DiscordVoiceState, extra?: { guildId?: BigString }): VoiceState {
  const props = bot.transformers.desiredProperties.voiceState
  const voiceState = {} as SetupDesiredProps<VoiceState, TransformersDesiredProperties, DesiredPropertiesBehavior>

  if (props.requestToSpeakTimestamp && payload.request_to_speak_timestamp)
    voiceState.requestToSpeakTimestamp = Date.parse(payload.request_to_speak_timestamp)
  if (props.channelId && payload.channel_id) voiceState.channelId = bot.transformers.snowflake(payload.channel_id)
  if (props.guildId && extra?.guildId) voiceState.guildId = bot.transformers.snowflake(extra.guildId)
  if (props.toggles) voiceState.toggles = new VoiceStateToggles(payload)
  if (props.sessionId) voiceState.sessionId = payload.session_id
  if (props.userId && payload.user_id) voiceState.userId = bot.transformers.snowflake(payload.user_id)

  return bot.transformers.customizers.voiceState(bot, payload, voiceState, {
    guildId: extra?.guildId ? bot.transformers.snowflake(extra.guildId) : undefined,
  })
}
