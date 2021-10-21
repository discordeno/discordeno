import type { ModifyGuildChannelPositions } from "../../types/guilds/modify_guild_channel_position.ts";
import type { Bot } from "../../bot.ts";

/** Modify the positions of channels on the guild. Requires MANAGE_CHANNELS permission. */
export async function swapChannels(bot: Bot, guildId: bigint, channelPositions: ModifyGuildChannelPositions[]) {
  if (channelPositions.length < 2) {
    throw "You must provide at least two channels to be swapped.";
  }

  return await bot.rest.runMethod<undefined>(bot.rest,"patch", bot.constants.endpoints.GUILD_CHANNELS(guildId), channelPositions.map((channelPosition) => {
    return {
      id: channelPosition.id,
      position: channelPosition.position,
      lock_positions: channelPosition.lockPositions,
      parent_id: channelPosition.parentId
    }
  }));
}
