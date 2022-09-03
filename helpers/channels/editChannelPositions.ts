import type { Bot } from "../../bot.ts";

export const swapChannels = editChannelPositions;

/** Modify the positions of channels on the guild. Requires MANAGE_CHANNELS permission. Only channels to be modified are required. */
export async function editChannelPositions(
  bot: Bot,
  guildId: bigint,
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
