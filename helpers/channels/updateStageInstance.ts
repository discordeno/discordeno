import type { StageInstance } from "../../types/channels/stageInstance.ts";
import type { Bot } from "../../bot.ts";
import { AtLeastOne } from "../../types/util.ts";

/** Updates fields of an existing Stage instance. Requires the user to be a moderator of the Stage channel. */
export async function updateStageInstance(bot: Bot, channelId: bigint, data: AtLeastOne<Pick<StageInstance, "topic">>) {
  const result = await bot.rest.runMethod<StageInstance>(
    bot.rest,
    "patch",
    bot.constants.endpoints.STAGE_INSTANCE(channelId),
    {
      topic: data.topic,
    },
  );

  return bot.transformers.stageInstance(bot, result);
}
