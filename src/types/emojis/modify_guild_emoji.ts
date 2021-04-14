export interface ModifyGuildEmoji {
  /** Name of the emoji */
  name?: string;
  /** Roles allowed to use this emoji */
  roles?: string[] | null;
}

/** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
export type DiscordModifyGuildEmoji = ModifyGuildEmoji;
