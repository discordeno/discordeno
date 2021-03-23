import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/**
 * Syncs the template to the guild's current state.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function syncGuildTemplate(guildID: string, templateCode: string) {
  await requireBotGuildPermissions(guildID, ["MANAGE_GUILD"]);

  const template = (await RequestManager.put(
    `${endpoints.GUILD_TEMPLATES(guildID)}/${templateCode}`,
  )) as GuildTemplate;

  return structures.createTemplateStruct(template);
}
