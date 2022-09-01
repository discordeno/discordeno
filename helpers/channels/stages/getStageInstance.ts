import type { Bot } from "../../../bot.ts";
import { StageInstance } from "../../../transformers/stageInstance.ts";
import { DiscordStageInstance } from "../../../types/discord.ts";

/** Gets the stage instance associated with the Stage channel, if it exists. */
export async function getStageInstance(bot: Bot, channelId: bigint): Promise<StageInstance> {
  const result = await bot.rest.runMethod<DiscordStageInstance>(
    bot.rest,
    "GET",
    bot.constants.routes.STAGE_INSTANCE(channelId),
  );

  return bot.transformers.stageInstance(bot, result);
}
