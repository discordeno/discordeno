export interface ModifyGuildEmoji {
  /** Name of the emoji */
  name?: string;
  /** Roles to which this emoji will be whitelisted */
  roles?: string[] | null;
}

export type DiscordModifyGuildEmoji = ModifyGuildEmoji;
