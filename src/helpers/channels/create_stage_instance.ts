import type { StageInstance } from "../../types/channels/stage_instance.ts";
import type { Bot } from "../../bot.ts";
import { ChannelTypes } from "../../types/channels/channel_types.ts";
import { PrivacyLevel } from "../../types/channels/privacy_level.ts";

/** Creates a new Stage instance associated to a Stage channel. Requires the user to be a moderator of the Stage channel. */
export async function createStageInstance(bot: Bot, channelId: bigint, topic: string, privacyLevel?: PrivacyLevel) {
  const channel = await bot.cache.channels.get(channelId);

  if (channel) {
    if (channel.type !== ChannelTypes.GuildStageVoice) {
      throw new Error(bot.constants.Errors.CHANNEL_NOT_STAGE_VOICE);
    }

    await bot.utils.requireBotChannelPermissions(bot, channel, ["MANAGE_CHANNELS", "MUTE_MEMBERS", "MOVE_MEMBERS"]);
  }

  if (!bot.utils.validateLength(topic, { max: 120, min: 1 })) {
    throw new Error(bot.constants.Errors.INVALID_TOPIC_LENGTH);
  }

  return await bot.rest.runMethod<StageInstance>(
      bot.rest,
    "post",
    bot.constants.endpoints.STAGE_INSTANCES,
    {
      channel_id: channelId,
      topic,
      privacy_level: privacyLevel,
    }
  );
}
