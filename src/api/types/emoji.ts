import { User } from "./user.ts";

// used
export interface Emoji {
  /** emoji id */
  id: string | null;
  /** emoji name */
  name: string | null;
  /** roles this emoji is whitelisted to */
  roles?: string[];
  /** user that created this emoji */
  user?: User;
  /** whether this emoji must be wrapped in colons */
  requireColons?: boolean;
  /** whether this emoji is managed */
  managed?: boolean;
  /** whether this emoji is animated */
  animated?: boolean;
  /** whether this emoji can be used, may be false due to loss of Server Boosts */
  available?: boolean;
}

// used
export interface CreateEmojiOptions {
  /** name of the emoji */
  name: string;
  /** the 128x128 emoji image (Data URI scheme) */
  image: string;
  /** roles for which this emoji will be whitelisted */
  roles: string[];
}

// used
export interface EditGuildEmojiOptions {
  /** name of the emoji */
  name?: string;
  /** roles to which this emoji will be whitelisted */
  roles?: string[] | null;
}
