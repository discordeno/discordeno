import { rest } from "../../rest/rest.ts";
import { DiscordValidateDiscoverySearchTerm } from "../../types/discovery/validate_discovery_search_term.ts";
import { endpoints } from "../../util/constants.ts";

export async function validDiscoveryTerm(term: string) {
  const result = await rest.runMethod<DiscordValidateDiscoverySearchTerm>(
    "get",
    endpoints.DISCOVERY_VALID_TERM,
    { term },
  );

  return result.valid;
}
