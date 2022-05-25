import { Collection } from "../../util/collection.ts";
import type { Bot } from "../../bot.ts";
import { DiscordDiscoveryCategory } from "../../types/discord.ts";

/** Returns a Collection (mapped by Id of the discovery category object) of discovery category objects that can be used when editing guilds */
export async function getDiscoveryCategories(bot: Bot) {
  const result = await bot.rest.runMethod<DiscordDiscoveryCategory[]>(
    bot.rest,
    "get",
    bot.constants.routes.DISCOVERY_CATEGORIES(),
  );

  return new Collection<number, DiscordDiscoveryCategory>(
    result.map((category) => [category.id, category]),
  );
}
