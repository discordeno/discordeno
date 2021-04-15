import { rest } from "../../rest/rest.ts";
import { DiscordTemplate, Template } from "../../types/templates/template.ts";
import { Collection } from "../../util/collection.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/**
 * Returns an array of templates.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function getGuildTemplates(guildId: string) {
  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  const templates = (await rest.runMethod(
    "get",
    endpoints.GUILD_TEMPLATES(guildId),
  )) as DiscordTemplate[];

  return new Collection(
    templates.map((template) => [
      template.code,
      snakeKeysToCamelCase<Template>(template),
    ]),
  );
}
