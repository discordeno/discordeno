import type { Bot } from "../../bot.ts";
import { DiscordDiscoveryCategory } from "../../types/discord.ts";
import { Collection } from "../../util/collection.ts";

export type DiscoveryCategory = {
  id: bigint;
  name: DiscoveryName;
  isPrimary: boolean;
};

export type DiscoveryName = {
  default: string;
  localizations?: Record<string, string>;
};

/** Returns a Collection (mapped by Id of the discovery category object) of discovery category objects that can be used when editing guilds */
export async function getDiscoveryCategories(bot: Bot): Promise<Collection<bigint, DiscoveryCategory>> {
  const result = await bot.rest.runMethod<DiscordDiscoveryCategory[]>(
    bot.rest,
    "GET",
    bot.constants.routes.DISCOVERY_CATEGORIES(),
  );

  const categories = result.map<DiscoveryCategory>((category) => ({
    id: BigInt(category.id),
    name: category.name,
    isPrimary: category.is_primary,
  }));

  return new Collection(
    categories.map((category) => [category.id, category]),
  );
}
