import { rest } from "../../rest/rest.ts";
import { DiscordTemplate, Template } from "../../types/templates/template.ts";
import { endpoints } from "../../util/constants.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/** Returns the guild template if it exists */
export async function getTemplate(templateCode: string) {
  const template = await rest.runMethod<DiscordTemplate>(
    "get",
    endpoints.GUILD_TEMPLATE(templateCode),
  );

  return snakeKeysToCamelCase<Template>(template);
}
