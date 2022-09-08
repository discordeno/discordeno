import { Bot } from "../../bot.ts";

export function editBotVoiceState(
  bot: Bot,
  guildId: bigint,
  options: { channelId?: bigint; suppress?: boolean; requestToSpeakTimestamp?: number },
) {
  return bot.rest.runMethod<void>(bot.rest, "PATCH", bot.constants.routes.EDIT_BOT_VOICE_STATE(guildId), {
    channel_id: options.channelId?.toString(),
    suppress: options.suppress,
    request_to_speak_timestamp: options.requestToSpeakTimestamp
      ? new Date(options.requestToSpeakTimestamp).toUTCString()
      : undefined,
  });
}
