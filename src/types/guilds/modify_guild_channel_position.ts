// TODO: most likely it is but check if lockPositions and parentId really are optional
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

/** https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions */
export type DiscordModifyGuildChannelPositions = ModifyGuildChannelPositions;
