/** Types for: https://docs.discord.com/developers/resources/emoji */

import type { DiscordUser } from './user.js';

/** https://docs.discord.com/developers/resources/emoji#emoji-object-emoji-structure */
export interface DiscordEmoji {
  /** Emoji id */
  id: string | null;
  /**
   * Emoji name
   *
   * @remarks
   * Can be null only in reaction emoji objects
   */
  name: string | null;
  /** Roles allowed to use this emoji */
  roles?: string[];
  /** User that created this emoji */
  user?: DiscordUser;
  /** Whether this emoji must be wrapped in colons */
  require_colons?: boolean;
  /** Whether this emoji is managed */
  managed?: boolean;
  /** Whether this emoji is animated */
  animated?: boolean;
  /** Whether this emoji can be used, may be false due to loss of Server Boosts */
  available?: boolean;
}
