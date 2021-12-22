import type { ModifyGuildChannelPositions } from "../../types/guilds/modifyGuildChannelPosition.ts";
import type { Bot } from "../../bot.ts";

/** Modify the positions of channels on the guild. Requires MANAGE_CHANNELS permission. Only channels to be modified are required. */
export async function swapChannels(bot: Bot, guildId: bigint, channelPositions: ModifyGuildChannelPositions[]) {
  if (!channelPositions.length) {
    throw "You must provide at least one channels to be moved.";
  }

  await bot.rest.runMethod<undefined>(
    bot.rest,
    "patch",
    bot.constants.endpoints.GUILD_CHANNELS(guildId),
    channelPositions.map((channelPosition) => {
      return {
        id: channelPosition.id,
        position: channelPosition.position,
        lock_positions: channelPosition.lockPositions,
        parent_id: channelPosition.parentId,
      };
    })
  );
}
