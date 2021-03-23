import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/**
 * Edit a template's metadata.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function editGuildTemplate(
  guildID: string,
  templateCode: string,
  data: EditGuildTemplate,
) {
  await requireBotGuildPermissions(guildID, ["MANAGE_GUILD"]);

  if (data.name?.length && (data.name.length < 1 || data.name.length > 100)) {
    throw new Error("The name can only be in between 1-100 characters.");
  }

  if (data.description?.length && data.description.length > 120) {
    throw new Error("The description can only be in between 0-120 characters.");
  }

  const template = (await RequestManager.patch(
    `${endpoints.GUILD_TEMPLATES(guildID)}/${templateCode}`,
    data,
  )) as GuildTemplate;

  return structures.createTemplateStruct(template);
}
