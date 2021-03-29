import { Emoji } from "../emojis/emoji.ts";
import { SnakeCaseProps } from "../util.ts";

/** https://discord.com/developers/docs/topics/gateway#guild-emojis-update */
export interface GuildEmojisUpdate {
  /** id of the guild */
  guild_id: string;
  /** Array of emojis */
  emojis: Emoji[];
}

export type DiscordGuildEmojisUpdate = SnakeCaseProps<GuildEmojisUpdate>;
