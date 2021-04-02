import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Returns a list of integrations for the guild. Requires the MANAGE_GUILD permission. */
export async function getIntegrations(guildId: string) {
  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  const result = await rest.runMethod(
    "get",
    endpoints.GUILD_INTEGRATIONS(guildId),
  );

  return result;
}
