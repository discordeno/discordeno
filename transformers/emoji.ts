import { Bot } from "../bot.ts";
import { DiscordEmoji } from "../types/discord.ts";
import { Emoji } from "../types/discordeno.ts";
import { DiscordenoUser } from "./member.ts";
import { EmojiToggles } from "./toggles/emoji.ts";

export function transformEmoji(bot: Bot, payload: DiscordEmoji): Emoji {
  return {
    id: payload.id ? bot.transformers.snowflake(payload.id) : undefined,
    name: payload.name || undefined,
    roles: payload.roles?.map((id) => bot.transformers.snowflake(id)),
    user: payload.user ? bot.transformers.user(bot, payload.user) : undefined,
    toggles: new EmojiToggles(payload),
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
