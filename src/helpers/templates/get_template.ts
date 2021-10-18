import type { Template } from "../../types/templates/template.ts";
import type {Bot} from "../../bot.ts";

/** Returns the guild template if it exists */
export async function getTemplate(bot: Bot, templateCode: string) {
  return await bot.rest.runMethod<Template>(bot.rest, "get", bot.constants.endpoints.GUILD_TEMPLATE(templateCode));
}
