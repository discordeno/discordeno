export interface CreateGuildEmoji {
  /** Name of the emoji */
  name: string;
  /** The 128x128 emoji image */
  image: string;
  /** Roles allowed to use this emoji */
  roles: string[];
}

/** https://discord.com/developers/docs/resources/emoji#create-guild-emoji */
export type DiscordCreateGuildEmojis = CreateGuildEmoji;
