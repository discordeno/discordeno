import { DiscordAllowedMentionsTypes } from "./allowed_mentions_types.ts";

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object */
export interface AllowedMentions {
  /** An array of allowed mention types to parse from the content. */
  parse?: DiscordAllowedMentionsTypes[];
  /** Array of role_ids to mention (Max size of 100) */
  roles?: string[];
  /** Array of user_ids to mention (Max size of 100) */
  users?: string[];
  /** For replies, whether to mention the author of the message being replied to (default false) */
  repliedUser?: boolean;
}
