import type { StageInstance } from "../../types/channels/stageInstance.ts";
import type { Bot } from "../../bot.ts";

/** Creates a new Stage instance associated to a Stage channel. Requires the user to be a moderator of the Stage channel. */
export async function createStageInstance(bot: Bot, channelId: bigint, topic: string) {
  const result = await bot.rest.runMethod<StageInstance>(bot.rest, "post", bot.constants.endpoints.STAGE_INSTANCES, {
    channel_id: channelId.toString(),
    topic,
  });

  return bot.transformers.stageInstance(bot, result);
}
