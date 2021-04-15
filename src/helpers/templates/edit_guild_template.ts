import { rest } from "../../rest/rest.ts";
import { ModifyGuildTemplate } from "../../types/templates/modify_guild_template.ts";
import { DiscordTemplate, Template } from "../../types/templates/template.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/**
 * Edit a template's metadata.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function editGuildTemplate(
  guildId: string,
  templateCode: string,
  data: ModifyGuildTemplate,
) {
  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  if (data.name?.length && (data.name.length < 1 || data.name.length > 100)) {
    throw new Error("The name can only be in between 1-100 characters.");
  }

  if (data.description?.length && data.description.length > 120) {
    throw new Error("The description can only be in between 0-120 characters.");
  }

  const template = await rest.runMethod<DiscordTemplate>(
    "patch",
    `${endpoints.GUILD_TEMPLATES(guildId)}/${templateCode}`,
    data,
  );

  return snakeKeysToCamelCase<Template>(template);
}
