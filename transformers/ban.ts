import { DiscordBan } from "../types/discord.ts";
import { Bot } from "../bot.ts";
import { Optionalize } from "../types/shared.ts";

export function transformBan(bot: Bot, payload: DiscordBan) {
  const ban = {
    reason: payload.reason ?? undefined,
    user: bot.transformers.user(bot, payload.user),
  };
  return ban as Optionalize<typeof ban>;
}

export interface Ban extends ReturnType<typeof transformBan> {}
