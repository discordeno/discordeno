import { User } from "../structures/user";

export interface Emoji {
  /** emoji id. It will be null for default discord emojis. */
  id: string | null
  /** The name of the emoji. (can be null only in reaction emoji objects when the custom emoji doesnt exist anymore) */
  name: string | null
  /** array of role ids	roles this emoji is whitelisted to */
  roles?: string[]
  /** User that created this emoji */
  user?: User
  /** 	whether this emoji must be wrapped in colons */
  require_colons?: boolean
  /** whether this emoji is managed */
  managed?: boolean
  /** whether this emoji is animated */
  animated?: boolean
}
