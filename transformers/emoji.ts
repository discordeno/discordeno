import { Bot } from "../bot.ts";
import { Emoji } from "../types/emojis/emoji.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { DiscordenoUser } from "./member.ts";

export function transformEmoji(bot: Bot, payload: SnakeCasedPropertiesDeep<Emoji>): DiscordenoEmoji {
  return {
    id: payload.id ? bot.transformers.snowflake(payload.id) : undefined,
    name: payload.name || undefined,
    roles: payload.roles?.map((id) => bot.transformers.snowflake(id)),
    user: payload.user ? bot.transformers.user(bot, payload.user) : undefined,
    // TODO: change to bitfield?
    requireColons: payload.require_colons,
    managed: payload.managed,
    animated: payload.animated,
    available: payload.available,
  };
}

export interface DiscordenoEmoji {
  /** Emoji id */
  id?: bigint;
  /** Emoji name (can only be null in reaction emoji objects) */
  name?: string;
  /** Roles allowed to use this emoji */
  roles?: bigint[];
  /** User that created this emoji */
  user?: DiscordenoUser;
  /** Whether this emoji must be wrapped in colons */
  requireColons?: boolean;
  /** Whether this emoji is managed */
  managed?: boolean;
  /** Whether this emoji is animated */
  animated?: boolean;
  /** Whether this emoji can be used, may be false due to loss of Server Boosts */
  available?: boolean;
}
