import type { AddGuildDiscoverySubcategory } from "../../types/discovery/add_guild_discovery_subcategory.ts";
import type { Bot } from "../../bot.ts";

/** Add a discovery subcategory to the guild. Requires the `MANAGE_GUILD` permission. */
export async function addDiscoverySubcategory(bot: Bot, guildId: bigint, categoryId: number) {
  return await bot.rest.runMethod<AddGuildDiscoverySubcategory>(
    bot.rest,
    "post",
    bot.constants.endpoints.DISCOVERY_SUBCATEGORY(guildId, categoryId)
  );
}
