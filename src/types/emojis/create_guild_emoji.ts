export interface CreateGuildEmoji {
  /** Name of the emoji */
  name: string;
  /** The 128x128 emoji image */
  image: string;
  /** Roles for which this emoji will be whitelisted */
  roles: string[];
}

export type DiscordCreateGuildEmojis = CreateGuildEmoji;
