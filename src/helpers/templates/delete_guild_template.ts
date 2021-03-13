import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import { GuildTemplate } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/**
 * Deletes a template from a guild.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function deleteGuildTemplate(
  guildID: string,
  templateCode: string,
) {
  await requireBotGuildPermissions(guildID, ["MANAGE_GUILD"]);

  const deletedTemplate = (await RequestManager.delete(
    `${endpoints.GUILD_TEMPLATES(guildID)}/${templateCode}`,
  )) as GuildTemplate;

  return structures.createTemplateStruct(deletedTemplate);
}
