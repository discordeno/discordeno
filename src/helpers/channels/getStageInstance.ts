import type { StageInstance } from "../../types/channels/stageInstance.ts";
import type { Bot } from "../../bot.ts";

/** Gets the stage instance associated with the Stage channel, if it exists. */
export async function getStageInstance(bot: Bot, channelId: bigint) {
  return await bot.rest.runMethod<StageInstance>(bot.rest, "get", bot.constants.endpoints.STAGE_INSTANCE(channelId));
}
