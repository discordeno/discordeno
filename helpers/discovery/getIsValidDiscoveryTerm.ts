import type { Bot } from "../../bot.ts";
import { DiscordValidateDiscoverySearchTerm } from "../../types/discord.ts";

export async function getIsValidDiscoveryTerm(bot: Bot, term: string): Promise<boolean> {
  const result = await bot.rest.runMethod<DiscordValidateDiscoverySearchTerm>(
    bot.rest,
    "GET",
    bot.constants.routes.DISCOVERY_VALID_TERM(term),
  );

  return result.valid;
}
