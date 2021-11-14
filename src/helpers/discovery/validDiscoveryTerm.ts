import type { ValidateDiscoverySearchTerm } from "../../types/discovery/validateDiscoverySearchTerm.ts";
import type { Bot } from "../../bot.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function validDiscoveryTerm(bot: Bot, term: string) {
  const result = await bot.rest.runMethod<ValidateDiscoverySearchTerm>(
    bot.rest,
    "get",
    bot.constants.endpoints.DISCOVERY_VALID_TERM,
    { term }
  );

  return result.valid;
}
