import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";
import { DiscordTemplate } from "../../types/templates/template.ts";

/**
 * Syncs the template to the guild's current state.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function syncGuildTemplate(guildId: string, templateCode: string) {
  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  const template = (await rest.runMethod(
    "put",
    `${endpoints.GUILD_TEMPLATES(guildId)}/${templateCode}`,
  )) as DiscordTemplate;

  return structures.createTemplateStruct(template);
}
