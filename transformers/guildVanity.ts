import { DiscordGuildVanity } from "../types/discord.ts";
import { Bot } from "../bot.ts";
import { Optionalize } from "../types/shared.ts";

export function transformGuildVanity(bot: Bot, payload: DiscordGuildVanity) {
  const guildPreview = {
    uses: payload.uses,
    code: payload.code,
  };
  return guildPreview as Optionalize<typeof guildPreview>;
}

export interface GuildVanity extends ReturnType<typeof transformGuildVanity> {}
