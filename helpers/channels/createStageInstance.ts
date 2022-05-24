import type { Bot } from "../../bot.ts";
import { DiscordStageInstance } from "../../types/discord.ts";

/** Creates a new Stage instance associated to a Stage channel. Requires the user to be a moderator of the Stage channel. */
export async function createStageInstance(bot: Bot, options: CreateStageInstance) {
  const result = await bot.rest.runMethod<DiscordStageInstance>(
    bot.rest,
    "POST",
    bot.constants.endpoints.STAGE_INSTANCES(),
    {
      channel_id: options.channelId.toString(),
      topic: options.topic,
      send_start_notification: options.sendStartNotification,
    },
  );

  return bot.transformers.stageInstance(bot, result);
}

export interface CreateStageInstance {
  channelId: bigint;
  topic: string;
  /** Notify @everyone that the stage instance has started. Requires the MENTION_EVERYONE permission. */
  sendStartNotification?: boolean;
}
