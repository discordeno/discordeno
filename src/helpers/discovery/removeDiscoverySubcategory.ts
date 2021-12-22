import type { Bot } from "../../bot.ts";

/** Removes a discovery subcategory from the guild. Requires the MANAGE_GUILD permission. Returns a 204 No Content on success. */
export async function removeDiscoverySubcategory(bot: Bot, guildId: bigint, categoryId: number) {
  await bot.rest.runMethod<undefined>(
    bot.rest,
    "delete",
    bot.constants.endpoints.DISCOVERY_SUBCATEGORY(guildId, categoryId)
  );
}
