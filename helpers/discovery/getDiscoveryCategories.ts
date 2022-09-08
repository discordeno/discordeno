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

/**
 * Gets the list of available discovery categories.
 *
 * @param bot - The bot instance to use to make the request.
 *
 * @privateRemarks
 * This endpoint is not formally documented.
 */
export async function getDiscoveryCategories(bot: Bot): Promise<Collection<bigint, DiscoveryCategory>> {
  const results = await bot.rest.runMethod<DiscordDiscoveryCategory[]>(
    bot.rest,
    "GET",
    bot.constants.routes.DISCOVERY_CATEGORIES(),
  );

  return new Collection(
    results.map((result) => {
      const category = { id: BigInt(result.id), name: result.name, isPrimary: result.is_primary };
      return [category.id, category];
    }),
  );
}
