import { Bot } from "../../bot.ts";
import { DiscordStageInstance } from "../../deps.ts";

/** Gets the stage instance associated with the Stage channel, if it exists. */
export async function getStageInstance(bot: Bot, channelId: bigint) {
  const result = await bot.rest.runMethod<DiscordStageInstance>(
    bot.rest,
    "GET",
    bot.constants.routes.STAGE_INSTANCE(channelId),
  );

  return bot.transformers.stageInstance(bot, result);
}
