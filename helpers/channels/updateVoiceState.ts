import type { Bot } from "../../bot.ts";

/**
 * Updates the bot's voice state
 * Caveats:
 *  - `channel_id` must currently point to a stage channel.
 *  - Bot must already have joined `channel_id`.
 *  - You must have the `MUTE_MEMBERS` permission. But can always suppress yourself.
 *  - You must have the `REQUEST_TO_SPEAK` permission to request to speak. You can always clear your own request to speak.
 *  - You are able to set `request_to_speak_timestamp` to any present or future time.
 *  - When suppressed, the user will have their `request_to_speak_timestamp` removed.
 */
export async function updateBotVoiceState(bot: Bot, guildId: bigint, options: UpdateSelfVoiceState) {
  await bot.rest.runMethod(bot.rest, "patch", bot.constants.endpoints.UPDATE_VOICE_STATE(guildId), {
    channel_id: options.channelId,
    suppress: options.suppress,
    request_to_speak_timestamp: options.requestToSpeakTimestamp
      ? new Date(options.requestToSpeakTimestamp).toISOString()
      : options.requestToSpeakTimestamp,
  });
}

/**
 * Updates the a user's voice state
 * Caveats:
 *  - `channel_id` must currently point to a stage channel.
 *  - User must already have joined `channel_id`.
 *  - You must have the `MUTE_MEMBERS` permission. But can always suppress yourself.
 *  - When unsuppressed, non-bot users will have their `request_to_speak_timestamp` set to the current time. Bot users will not.
 *  - You must have the `REQUEST_TO_SPEAK` permission to request to speak. You can always clear your own request to speak.
 *  - You are able to set `request_to_speak_timestamp` to any present or future time.
 *  - When suppressed, the user will have their `request_to_speak_timestamp` removed.
 */
export async function updateUserVoiceState(bot: Bot, guildId: bigint, options: UpdateOthersVoiceState) {
  await bot.rest.runMethod(
    bot.rest,
    "patch",
    bot.constants.endpoints.UPDATE_VOICE_STATE(guildId, options.userId),
    {
      channel_id: options.channelId,
      suppress: options.suppress,
      user_id: options.userId,
    },
  );
}

/** https://discord.com/developers/docs/resources/guild#update-current-user-voice-state */
export interface UpdateSelfVoiceState {
  /** The id of the channel the user is currently in */
  channelId: bigint;
  /** Toggles the user's suppress state */
  suppress?: boolean;
  /** Sets the user's request to speak */
  requestToSpeakTimestamp?: number | null;
}

/** https://discord.com/developers/docs/resources/guild#update-user-voice-state */
export interface UpdateOthersVoiceState {
  /** The id of the channel the user is currently in */
  channelId: bigint;
  /** Toggles the user's suppress state */
  suppress?: boolean;
  /** The user id to target */
  userId: bigint;
}
