import type { StageInstance } from "../../types/channels/stageInstance.ts";
import type { Bot } from "../../bot.ts";
import { AtLeastOne } from "../../types/util.ts";

/** Updates fields of an existing Stage instance. Requires the user to be a moderator of the Stage channel. */
export async function updateStageInstance(bot: Bot, channelId: bigint, data: AtLeastOne<Pick<StageInstance, "topic">>) {
  if (
    data.topic &&
    !bot.utils.validateLength(data.topic, {
      min: 1,
      max: 120,
    })
  ) {
    throw new Error(bot.constants.Errors.INVALID_TOPIC_LENGTH);
  }

  const result = await bot.rest.runMethod<StageInstance>(
    bot.rest,
    "patch",
    bot.constants.endpoints.STAGE_INSTANCE(channelId),
    {
      topic: data.topic,
    }
  );

  return {
    id: bot.transformers.snowflake(result.id),
    guildId: bot.transformers.snowflake(result.guild_id),
    channelId: bot.transformers.snowflake(result.channel_id),
    topic: result.topic,
  };
}
