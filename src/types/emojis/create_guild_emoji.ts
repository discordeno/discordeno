/** https://discord.com/developers/docs/resources/emoji#create-guild-emoji */
export interface CreateGuildEmoji {
  /** Name of the emoji */
  name: string;
  /** The 128x128 emoji image */
  image: string;
  /** Roles allowed to use this emoji */
  roles?: bigint[];
  /** The reason you are creating this emoji */
  reason?: string;
}