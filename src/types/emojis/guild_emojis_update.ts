import { Emoji } from "../emojis/emoji.ts";
import { SnakeCaseProps } from "../util.ts";

export interface GuildEmojisUpdate {
  /** id of the guild */
  guildId: string;
  /** Array of emojis */
  emojis: Emoji[];
}

/** https://discord.com/developers/docs/topics/gateway#guild-emojis-update */
export type DiscordGuildEmojisUpdate = SnakeCaseProps<GuildEmojisUpdate>;
