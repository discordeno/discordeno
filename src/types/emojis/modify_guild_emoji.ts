export interface ModifyGuildEmoji {
  /** Name of the emoji */
  name?: string;
  /** Roles to which this emoji will be whitelisted */
  roles?: string[] | null;
}

/** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
export type DiscordModifyGuildEmoji = ModifyGuildEmoji;
