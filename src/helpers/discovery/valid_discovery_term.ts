import type { ValidateDiscoverySearchTerm } from "../../types/discovery/validate_discovery_search_term.ts";
import type { Bot } from "../../bot.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function validDiscoveryTerm(bot: Bot, term: string) {
  const result = await bot.rest.runMethod<SnakeCasedPropertiesDeep<ValidateDiscoverySearchTerm>>(
    "get",
    bot.constants.endpoints.DISCOVERY_VALID_TERM,
    { term }
  );

  return result.valid;
}
