import { Bot } from "../../bot.ts";

/** Updates the current user's voice state. `channelId` must currently point to a stage channel. Bot must already have joined `channelId`. You must have the `MUTE_MEMBERS` permission to unsuppress yourself. You can always suppress yourself. You must have the `REQUEST_TO_SPEAK` permission to request to speak. You can always clear your own request to speak. You are able to set `requestToSpeakTimestamp` to any present or future time.
 */
export async function editBotVoiceState(
  bot: Bot,
  guildId: bigint,
  options: EditBotVoiceStateOptions,
) {
  return await bot.rest.runMethod<void>(bot.rest, "PATCH", bot.constants.routes.EDIT_BOT_VOICE_STATE(guildId), {
    channel_id: options.channelId?.toString(),
    suppress: options.suppress,
    request_to_speak_timestamp: options.requestToSpeakTimestamp
      ? new Date(options.requestToSpeakTimestamp).toISOString()
      : undefined,
  });
}

export interface EditBotVoiceStateOptions {
  /** The id of the channel the bot is currently in */
  channelId?: bigint;
  /** Toggles the bot's suppress state */
  suppress?: boolean;
  /** Sets the bot's request to speak */
  requestToSpeakTimestamp?: number;
}
