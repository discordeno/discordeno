import type { StageInstance } from "../../types/channels/stage_instance.ts";
import type { Bot } from "../../bot.ts";
import { ChannelTypes } from "../../types/channels/channel_types.ts";

/** Updates fields of an existing Stage instance. Requires the user to be a moderator of the Stage channel. */
export async function updateStageInstance(
  bot: Bot,
  channelId: bigint,
  data: Partial<Pick<StageInstance, "topic" | "privacyLevel">> = {}
) {
  if (
    data?.topic &&
    !bot.utils.validateLength(data.topic, {
      min: 1,
      max: 120,
    })
  ) {
    throw new Error(bot.constants.Errors.INVALID_TOPIC_LENGTH);
  }

  return await bot.rest.runMethod<StageInstance>(bot.rest, "patch", bot.constants.endpoints.STAGE_INSTANCE(channelId), {
    topic: data.topic,
    privacy_level: data.privacyLevel,
  });
}
