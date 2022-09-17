import type { Bot } from "../../../bot.ts";
import { BigString, WithReason } from "../../../mod.ts";
import { StageInstance } from "../../../transformers/stageInstance.ts";
import { DiscordStageInstance } from "../../../types/discord.ts";

/**
 * Edits a stage instance.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the stage channel the stage instance is associated with.
 * @returns An instance of the updated {@link StageInstance}.
 *
 * @remarks
 * Requires the user to be a moderator of the stage channel.
 *
 * Fires a _Stage Instance Update_ event.
 *
 * @see {@link https://discord.com/developers/docs/resources/stage-instance#modify-stage-instance}
 */
export async function editStageInstance(
  bot: Bot,
  channelId: BigString,
  data: EditStageInstanceOptions,
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

export interface EditStageInstanceOptions extends WithReason {
  /** The topic of the Stage instance (1-120 characters) */
  topic: string;
}
