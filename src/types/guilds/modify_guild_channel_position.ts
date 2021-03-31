export interface ModifyGuildChannelPositions {
  /** Channel id */
  id: string;
  /** Sorting position of the channel */
  position: number | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions */
export type DiscordModifyGuildChannelPositions = ModifyGuildChannelPositions;
