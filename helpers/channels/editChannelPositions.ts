import type { Bot } from "../../bot.ts";
import { BigString } from "../../types/shared.ts";

export const swapChannels = editChannelPositions;

/**
 * Edits the positions of a set of channels in a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild in which to edit the positions of the channels.
 * @param channelPositions - A set of objects defining the updated positions of the channels.
 *
 * @remarks
 * Requires the `MANAGE_CHANNELS` permission.
 *
 * Fires a _Channel Update_ gateway event for every channel impacted in this change.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions}
 */
export async function editChannelPositions(
  bot: Bot,
  guildId: BigString,
  channelPositions: ModifyGuildChannelPositions[],
): Promise<void> {
  if (!channelPositions.length) {
    throw new Error("You must provide at least one channels to be moved.");
  }

  return await bot.rest.runMethod<void>(
    bot.rest,
    "PATCH",
    bot.constants.routes.GUILD_CHANNELS(guildId),
    channelPositions.map((channelPosition) => ({
      id: channelPosition.id,
      position: channelPosition.position,
      lock_positions: channelPosition.lockPositions,
      parent_id: channelPosition.parentId,
    })),
  );
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions */
export interface ModifyGuildChannelPositions {
  /** Channel id */
  id: string;
  /** Sorting position of the channel */
  position: number | null;
  /** Syncs the permission overwrites with the new parent, if moving to a new category */
  lockPositions?: boolean | null;
  /** The new parent ID for the channel that is moved */
  parentId?: string | null;
}
