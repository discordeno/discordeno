import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Removes a discovery subcategory from the guild. Requires the MANAGE_GUILD permission. Returns a 204 No Content on success. */
export async function removeDiscoverySubcategory(guildId: bigint, categoryId: number) {
  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  return await rest.runMethod<undefined>("delete", endpoints.DISCOVERY_SUBCATEGORY(guildId, categoryId));
}
