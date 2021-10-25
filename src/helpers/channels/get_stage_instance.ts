import { ChannelTypes } from "../../types/channels/channel_types.ts";
import type { StageInstance } from "../../types/channels/stage_instance.ts";
import type { Bot } from "../../bot.ts";

/** Gets the stage instance associated with the Stage channel, if it exists. */
export async function getStageInstance(bot: Bot, channelId: bigint) {
  const channel = await bot.cache.channels.get(channelId);

  if (channel) {
    if (channel.type !== ChannelTypes.GuildStageVoice) {
      throw new Error(bot.constants.Errors.CHANNEL_NOT_STAGE_VOICE);
    }
  }

  return await bot.rest.runMethod<StageInstance>(bot.rest, "get", bot.constants.endpoints.STAGE_INSTANCE(channelId));
}
