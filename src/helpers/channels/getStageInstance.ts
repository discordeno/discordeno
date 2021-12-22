import type { StageInstance } from "../../types/channels/stageInstance.ts";
import type { Bot } from "../../bot.ts";

/** Gets the stage instance associated with the Stage channel, if it exists. */
export async function getStageInstance(bot: Bot, channelId: bigint) {
  const result = await bot.rest.runMethod<StageInstance>(
    bot.rest,
    "get",
    bot.constants.endpoints.STAGE_INSTANCE(channelId)
  );

  return {
    id: bot.transformers.snowflake(result.id),
    guildId: bot.transformers.snowflake(result.guild_id),
    channelId: bot.transformers.snowflake(result.channel_id),
    topic: result.topic,
  };
}
