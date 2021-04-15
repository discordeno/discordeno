import { rest } from "../../rest/rest.ts";
import { DiscordTemplate, Template } from "../../types/templates/template.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/**
 * Deletes a template from a guild.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function deleteGuildTemplate(
  guildId: string,
  templateCode: string,
) {
  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  const deletedTemplate = await rest.runMethod<DiscordTemplate>(
    "delete",
    `${endpoints.GUILD_TEMPLATES(guildId)}/${templateCode}`,
  );

  return snakeKeysToCamelCase<Template>(deletedTemplate);
}
