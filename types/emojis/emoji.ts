import { User } from "../users/user.ts";

/** https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure */
export interface Emoji {
  /** Emoji id */
  id?: string;
  /** Emoji name (can only be null in reaction emoji objects) */
  name?: string;
  /** Roles allowed to use this emoji */
  roles?: string[];
  /** User that created this emoji */
  user?: User;
  /** Whether this emoji must be wrapped in colons */
  requireColons?: boolean;
  /** Whether this emoji is managed */
  managed?: boolean;
  /** Whether this emoji is animated */
  animated?: boolean;
  /** Whether this emoji can be used, may be false due to loss of Server Boosts */
  available?: boolean;
}
