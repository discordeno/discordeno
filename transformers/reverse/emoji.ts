import { Bot } from "../../bot.ts";
import { DiscordEmoji } from "../../types/discord.ts";
import { Emoji } from "../emoji.ts";

export function transformEmojiToDiscordEmoji(bot: Bot, payload: Emoji): DiscordEmoji {
  return {
    id: payload.id ? bot.transformers.reverse.snowflake(payload.id) : undefined,
    name: payload.name || undefined,
    roles: payload.roles?.map((id) => bot.transformers.reverse.snowflake(id)),
    user: payload.user ? bot.transformers.reverse.user(bot, payload.user) : undefined,
    require_colons: payload.toggles.requireColons,
    managed: payload.toggles.managed,
    animated: payload.toggles.animated,
    available: payload.toggles.available,
  };
}
