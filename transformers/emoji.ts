import { Bot } from "../bot.ts";
import { DiscordEmoji } from "../types/discord.ts";
import { EmojiToggles } from "./toggles/emoji.ts";

export function transformEmoji(bot: Bot, payload: DiscordEmoji) {
  return {
    id: payload.id ? bot.transformers.snowflake(payload.id) : undefined,
    name: payload.name || undefined,
    roles: payload.roles?.map((id) => bot.transformers.snowflake(id)),
    user: payload.user ? bot.transformers.user(bot, payload.user) : undefined,
    toggles: new EmojiToggles(payload),
  };
}

export interface Emoji extends ReturnType<typeof transformEmoji> {}
