import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
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

  const deletedTemplate =
    (await rest.runMethod(
      "delete",
      `${endpoints.GUILD_TEMPLATES(guildId)}/${templateCode}`,
    )) as GuildTemplate;

  return structures.createTemplateStruct(deletedTemplate);
}
