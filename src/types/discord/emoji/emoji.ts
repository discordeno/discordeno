import { DiscordUser } from "../member/user/user.ts";

/** https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure */
export interface DiscordEmoji {
  /** emoji id */
  id: string | null;
  /** emoji name */
  name: string | null;
  /** roles this emoji is whitelisted to */
  roles?: string[];
  /** user that created this emoji */
  user?: DiscordUser;
  /** whether this emoji must be wrapped in colons */
  // deno-lint-ignore camelcase
  require_colons?: boolean;
  /** whether this emoji is managed */
  managed?: boolean;
  /** whether this emoji is animated */
  animated?: boolean;
  /** whether this emoji can be used, may be false due to loss of Server Boosts */
  available?: boolean;
}
