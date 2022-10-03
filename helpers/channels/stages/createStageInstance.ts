import type { Bot } from "../../../bot.ts";
import { BigString, WithReason } from "../../../mod.ts";
import { StageInstance } from "../../../transformers/stageInstance.ts";
import { DiscordStageInstance } from "../../../types/discord.ts";

/**
 * Creates a stage instance associated with a stage channel.
 *
 * @param bot - The bot instance to use to make the request.
 * @param options - The parameters for the creation of the stage instance.
 * @returns An instance of the created {@link StageInstance}.
 *
 * @remarks
 * Requires the user to be a moderator of the stage channel.
 *
 * Fires a _Stage Instance Create_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/stage-instance#create-stage-instance}
 */
export async function createStageInstance(bot: Bot, options: CreateStageInstance): Promise<StageInstance> {
  const result = await bot.rest.runMethod<DiscordStageInstance>(
    bot.rest,
    "POST",
    bot.constants.routes.STAGE_INSTANCES(),
    {
      channel_id: options.channelId.toString(),
      topic: options.topic,
      send_start_notification: options.sendStartNotification,
      reason: options.reason,
    },
  );

  return bot.transformers.stageInstance(bot, result);
}

export interface CreateStageInstance extends WithReason {
  channelId: BigString;
  topic: string;
  /** Notify @everyone that the stage instance has started. Requires the MENTION_EVERYONE permission. */
  sendStartNotification?: boolean;
}
