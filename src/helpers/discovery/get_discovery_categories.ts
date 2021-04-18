import { rest } from "../../rest/rest.ts";
import {
  DiscordDiscoveryCategory,
  DiscoveryCategory,
} from "../../types/discovery/discovery_category.ts";
import { Collection } from "../../util/collection.ts";
import { endpoints } from "../../util/constants.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/** Returns an array of discovery category objects that can be used when editing guilds */
export async function getDiscoveryCategories() {
  const result = await rest.runMethod<DiscordDiscoveryCategory[]>(
    "get",
    endpoints.DISCOVERY_CATEGORIES,
  );

  return new Collection<number, DiscoveryCategory>(
    result.map(
      (category) => [
        category.id,
        snakeKeysToCamelCase<DiscoveryCategory>(category),
      ],
    ),
  );
}
