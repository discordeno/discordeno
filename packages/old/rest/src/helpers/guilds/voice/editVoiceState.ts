import { routes } from '@discordeno/constant'
import type { BigString, DiscordEditOwnVoiceState, DiscordEditUserVoiceState } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'

export const updateBotVoiceState = editOwnVoiceState

/**
 * Edits the voice state of the bot user.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild in which to edit the voice state of the bot user.
 * @param options - The parameters for the edit of the voice state.
 *
 * @remarks
 * The {@link EditOwnVoiceState.channelId | channelId} property of the {@link options} object parameter must point to a stage channel, and the bot user must already have joined it.
 *
 * If attempting to unmute oneself:
 * - Requires the `MUTE_MEMBERS` permission.
 *
 * If attempting to request to speak:
 * - Requires the `REQUEST_TO_SPEAK` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state}
 */
export async function editOwnVoiceState (
  rest: RestManager,
  guildId: BigString,
  options: EditOwnVoiceState
): Promise<void> {
  return await rest.runMethod<void>(

    'PATCH',
    routes.UPDATE_VOICE_STATE(guildId),
    {
      channel_id: options.channelId,
      suppress: options.suppress,
      request_to_speak_timestamp: options.requestToSpeakTimestamp
        ? new Date(options.requestToSpeakTimestamp).toISOString()
        : options.requestToSpeakTimestamp
    } as DiscordEditOwnVoiceState
  )
}

// TODO: Make the `userId` property of `options` its own parameter.

/**
 * Edits the voice state of another user.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild in which to edit the voice state of the bot user.
 * @param options - The parameters for the edit of the voice state.
 *
 * @remarks
 * The {@link EditOwnVoiceState.channelId | channelId} property of the {@link options} object parameter must point to a stage channel, and the user must already have joined it.
 *
 * Requires the `MUTE_MEMBERS` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state}
 */
export async function editUserVoiceState (
  rest: RestManager,
  guildId: BigString,
  options: EditUserVoiceState
): Promise<void> {
  return await rest.runMethod<void>(

    'PATCH',
    routes.UPDATE_VOICE_STATE(guildId, options.userId),
    {
      channel_id: options.channelId,
      suppress: options.suppress,
      user_id: options.userId
    } as DiscordEditUserVoiceState
  )
}

/** https://discord.com/developers/docs/resources/guild#update-current-user-voice-state */
export interface EditOwnVoiceState {
  /** The id of the channel the user is currently in */
  channelId: BigString
  /** Toggles the user's suppress state */
  suppress?: boolean
  /** Sets the user's request to speak */
  requestToSpeakTimestamp?: number | null
}

/** https://discord.com/developers/docs/resources/guild#update-user-voice-state */
export interface EditUserVoiceState {
  /** The id of the channel the user is currently in */
  channelId: BigString
  /** Toggles the user's suppress state */
  suppress?: boolean
  /** The user id to target */
  userId: BigString
}
