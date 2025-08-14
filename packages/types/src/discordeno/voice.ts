/** Types for: https://discord.com/developers/docs/resources/voice */

import type { BigString } from '../shared.js'

/** https://discord.com/developers/docs/resources/voice#modify-current-user-voice-state-json-params */
export interface EditOwnVoiceState {
  /** The id of the channel the user is currently in */
  channelId?: BigString
  /** Toggles the user's suppress state */
  suppress?: boolean
  /** Sets the user's request to speak */
  requestToSpeakTimestamp?: number | null
}

/** https://discord.com/developers/docs/resources/voice#modify-user-voice-state-json-params */
export interface EditUserVoiceState {
  /** The id of the channel the user is currently in */
  channelId?: BigString
  /** Toggles the user's suppress state */
  suppress?: boolean
  /** The user id to target */
  userId: BigString
}
