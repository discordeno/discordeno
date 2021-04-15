import { rest } from "../../rest/rest.ts";
import { DiscordTemplate, Template } from "../../types/templates/template.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/**
 * Syncs the template to the guild's current state.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function syncGuildTemplate(guildId: string, templateCode: string) {
  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  const template = await rest.runMethod<DiscordTemplate>(
    "put",
    `${endpoints.GUILD_TEMPLATES(guildId)}/${templateCode}`,
  );

  return snakeKeysToCamelCase<Template>(template);
}
