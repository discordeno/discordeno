import { rest } from "../../rest/rest.ts";
import { DiscordTemplate, Template } from "../../types/templates/template.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/**
 * Creates a template for the guild.
 * Requires the `MANAGE_GUILD` permission.
 * @param name name of the template (1-100 characters)
 * @param description description for the template (0-120 characters
 */
export async function createGuildTemplate(
  guildId: string,
  data: Template,
) {
  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  if (data.name.length < 1 || data.name.length > 100) {
    throw new Error("The name can only be in between 1-100 characters.");
  }

  if (data.description?.length && data.description.length > 120) {
    throw new Error("The description can only be in between 0-120 characters.");
  }

  const template = await rest.runMethod<DiscordTemplate>(
    "post",
    endpoints.GUILD_TEMPLATES(guildId),
    data,
  );

  return snakeKeysToCamelCase<Template>(template);
}
