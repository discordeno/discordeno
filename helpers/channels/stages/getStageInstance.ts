import type { Bot } from "../../../bot.ts";
import { StageInstance } from "../../../transformers/stageInstance.ts";
import { DiscordStageInstance } from "../../../types/discord.ts";
import { BigString } from "../../../types/shared.ts";

/**
 * Gets the stage instance associated with a stage channel, if one exists.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the stage channel the stage instance is associated with.
 * @returns An instance of {@link StageInstance}.
 *
 * @see {@link https://discord.com/developers/docs/resources/stage-instance#get-stage-instance}
 */
export async function getStageInstance(bot: Bot, channelId: BigString): Promise<StageInstance> {
  const result = await bot.rest.runMethod<DiscordStageInstance>(
    bot.rest,
    "GET",
    bot.constants.routes.STAGE_INSTANCE(channelId),
  );

  return bot.transformers.stageInstance(bot, result);
}
