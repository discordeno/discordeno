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
  const results = await bot.rest.runMethod<DiscordDiscoveryCategory[]>(
    bot.rest,
    "GET",
    bot.constants.routes.DISCOVERY_CATEGORIES(),
  );

  return new Collection(
    results.map((result) => {
      const category = {
        id: BigInt(result.id),
        name: result.name,
        isPrimary: result.is_primary,
      };
      return [category.id, category];
    }),
  );
}
