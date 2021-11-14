import type { UpdateOthersVoiceState } from "../../types/guilds/update_others_voice_state.ts";
import type { UpdateSelfVoiceState } from "../../types/guilds/update_self_voice_state.ts";
import type { Bot } from "../../bot.ts";

/**
 * Updates the a user's voice state, defaults to the current user
 * Caveats:
 *  - `channel_id` must currently point to a stage channel.
 *  - User must already have joined `channel_id`.
 *  - You must have the `MUTE_MEMBERS` permission. But can always suppress yourself.
 *  - When unsuppressed, non-bot users will have their `request_to_speak_timestamp` set to the current time. Bot users will not.
 *  - You must have the `REQUEST_TO_SPEAK` permission to request to speak. You can always clear your own request to speak.
 *  - You are able to set `request_to_speak_timestamp` to any present or future time.
 *  - When suppressed, the user will have their `request_to_speak_timestamp` removed.
 */
export async function updateBotVoiceState(
  bot: Bot,
  guildId: bigint,
  options: UpdateSelfVoiceState | ({ userId: bigint } & UpdateOthersVoiceState)
) {
  return await bot.rest.runMethod(
    bot.rest,
    "patch",
    bot.constants.endpoints.UPDATE_VOICE_STATE(
      guildId,
      bot.utils.hasProperty(options, "userId") ? options.userId : undefined
    ),
    {
      channel_id: options.channelId,
      suppress: options.suppress,
      request_to_speak_timestamp: bot.utils.hasProperty(options, "requestToSpeakTimestamp")
        ? options.requestToSpeakTimestamp
        : undefined,
      user_id: bot.utils.hasProperty(options, "userId") ? options.userId : undefined,
    }
  );
}
