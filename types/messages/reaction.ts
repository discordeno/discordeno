import { DiscordEmoji } from "../discord.ts";

/** https://discord.com/developers/docs/resources/channel#reaction-object */
export interface Reaction {
  /** Times this emoji has been used to react */
  count: number;
  /** Whether the current user reacted using this emoji */
  me: boolean;
  /** Emoji information */
  emoji: Partial<DiscordEmoji>;
}
