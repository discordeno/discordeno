import { rest } from "../../rest/rest.ts";
import { Template } from "../../types/templates/template.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/**
 * Deletes a template from a guild.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function deleteGuildTemplate(
  guildId: string,
  templateCode: string,
) {
  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  return await rest.runMethod<Template>(
    "delete",
    `${endpoints.GUILD_TEMPLATES(guildId)}/${templateCode}`,
  );
}
