import type { Bot } from "../../bot.ts";
import { DiscordValidateDiscoverySearchTerm } from "../../types/discord.ts";

/**
 * Gets the validity of a discovery term.
 *
 * @param bot - The bot instance to use to make the request.
 * @param term - The term to validate.
 *
 * @privateRemarks
 * This endpoint is not formally documented.
 */
export async function getIsValidDiscoveryTerm(bot: Bot, term: string): Promise<boolean> {
  const result = await bot.rest.runMethod<DiscordValidateDiscoverySearchTerm>(
    bot.rest,
    "GET",
    bot.constants.routes.DISCOVERY_VALID_TERM(term),
  );

  return result.valid;
}
