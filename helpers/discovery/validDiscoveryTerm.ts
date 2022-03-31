import type { Bot } from "../../bot.ts";
import { DiscordValidateDiscoverySearchTerm } from "../../types/discord.ts";

export async function validDiscoveryTerm(bot: Bot, term: string) {
  const result = await bot.rest.runMethod<DiscordValidateDiscoverySearchTerm>(
    bot.rest,
    "get",
    `${bot.constants.endpoints.DISCOVERY_VALID_TERM()}?term=${term}`,
  );

  return result.valid;
}
