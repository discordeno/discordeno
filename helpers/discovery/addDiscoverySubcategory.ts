import type { Bot } from "../../bot.ts";

/** Add a discovery subcategory to the guild. Requires the `MANAGE_GUILD` permission. */
export async function addDiscoverySubcategory(bot: Bot, guildId: bigint, categoryId: number): Promise<void> {
  return void await bot.rest.runMethod(
    bot.rest,
    "POST",
    bot.constants.routes.DISCOVERY_SUBCATEGORY(guildId, categoryId),
  );
}
