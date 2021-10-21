import { ChannelTypes } from "../../types/channels/channel_types.ts";
import type { Bot } from "../../bot.ts";

/** Deletes the Stage instance. Requires the user to be a moderator of the Stage channel. */
export async function deleteStageInstance(bot: Bot, channelId: bigint) {
  const channel = await bot.cache.channels.get(channelId);

  if (channel) {
    if (channel.type !== ChannelTypes.GuildStageVoice) {
      throw new Error(bot.constants.Errors.CHANNEL_NOT_STAGE_VOICE);
    }

    await bot.utils.requireBotChannelPermissions(bot, channel, ["MUTE_MEMBERS", "MANAGE_CHANNELS", "MOVE_MEMBERS"]);
  }

  return await bot.rest.runMethod<undefined>(bot.rest, "delete", bot.constants.endpoints.STAGE_INSTANCE(channelId));
}
