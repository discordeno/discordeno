import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";
import { DiscordTemplate } from "../../types/templates/template.ts";

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

  return templates.map((template) => structures.createTemplateStruct(template));
}
