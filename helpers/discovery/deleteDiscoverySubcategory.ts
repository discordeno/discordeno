import type { Bot } from "../../bot.ts";

/** Deletes a discovery subcategory from the guild. Requires the MANAGE_GUILD permission. Returns a 204 No Content on success. */
export async function deleteDiscoverySubcategory(bot: Bot, guildId: bigint, categoryId: number): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.DISCOVERY_SUBCATEGORY(guildId, categoryId),
  );
}
