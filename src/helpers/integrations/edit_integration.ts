import { rest } from "../../rest/rest.ts";
import { ModifyGuildIntegration } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Modify the behavior and settings of an integration object for the guild. Requires the MANAGE_GUILD permission. */
export async function editIntegration(
  guildId: string,
  id: string,
  options: ModifyGuildIntegration,
) {
  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  const result = await rest.runMethod(
    "patch",
    endpoints.GUILD_INTEGRATION(guildId, id),
    options,
  );

  return result;
}
