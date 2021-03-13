import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import { GuildTemplate } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns the guild template if it exists */
export async function getTemplate(templateCode: string) {
  const result = (await RequestManager.get(
    endpoints.GUILD_TEMPLATE(templateCode),
  ) as GuildTemplate);
  const template = await structures.createTemplateStruct(result);

  return template;
}
