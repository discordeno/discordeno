import { DiscordEmoji } from "../discord.ts";

/** https://discord.com/developers/docs/topics/gateway#guild-emojis-update */
export interface GuildEmojisUpdate {
  /** id of the guild */
  guildId: string;
  /** Array of emojis */
  emojis: DiscordEmoji[];
}
