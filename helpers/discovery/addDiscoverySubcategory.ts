import type { Bot } from "../../bot.ts";

/**
 * Adds a discovery subcategory to a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to add the subcategory to.
 * @param categoryId - The ID of the category to add to the guild.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * @privateRemarks
 * This endpoint is not formally documented.
 */
export async function addDiscoverySubcategory(bot: Bot, guildId: bigint, categoryId: number): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "POST",
    bot.constants.routes.DISCOVERY_SUBCATEGORY(guildId, categoryId),
  );
}
