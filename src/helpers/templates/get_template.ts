import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns the guild template if it exists */
export async function getTemplate(templateCode: string) {
  const result = (await rest.runMethod(
    "get",
    endpoints.GUILD_TEMPLATE(templateCode),
  ) as GuildTemplate);
  const template = await structures.createTemplateStruct(result);

  return template;
}
