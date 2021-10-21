import type { DiscoveryCategory } from "../../types/discovery/discovery_category.ts";
import { Collection } from "../../util/collection.ts";
import type { Bot } from "../../bot.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

/** Returns a Collection (mapped by Id of the discovery category object) of discovery category objects that can be used when editing guilds */
export async function getDiscoveryCategories(bot: Bot) {
  const result = await bot.rest.runMethod<SnakeCasedPropertiesDeep<DiscoveryCategory>[]>(
    bot.rest,
    "get",
    bot.constants.endpoints.DISCOVERY_CATEGORIES
  );

  return new Collection<number, SnakeCasedPropertiesDeep<DiscoveryCategory>>(
    result.map((category) => [category.id, category])
  );
}
