import type { Bot } from "../../bot.ts";

/**
 * Deletes a discovery subcategory from a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to delete the subcategory from.
 * @param categoryId - The ID of the category to delete from the guild.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * @privateRemarks
 * This endpoint is not formally documented.
 */
export async function deleteDiscoverySubcategory(bot: Bot, guildId: bigint, categoryId: number): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.DISCOVERY_SUBCATEGORY(guildId, categoryId),
  );
}
