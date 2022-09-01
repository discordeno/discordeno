import type { Bot } from "../../../bot.ts";
import { StageInstance } from "../../../transformers/stageInstance.ts";
import { DiscordStageInstance } from "../../../types/discord.ts";
import { AtLeastOne } from "../../../types/shared.ts";

/** Updates fields of an existing Stage instance. Requires the user to be a moderator of the Stage channel. */
export async function updateStageInstance(
  bot: Bot,
  channelId: bigint,
  data: AtLeastOne<Pick<DiscordStageInstance, "topic">>,
): Promise<StageInstance> {
  const result = await bot.rest.runMethod<DiscordStageInstance>(
    bot.rest,
    "PATCH",
    bot.constants.routes.STAGE_INSTANCE(channelId),
    {
      topic: data.topic,
    },
  );

  return bot.transformers.stageInstance(bot, result);
}
