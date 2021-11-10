import type { Template } from "../../types/templates/template.ts";
import { Collection } from "../../util/collection.ts";
import type { Bot } from "../../bot.ts";

/**
 * Returns an array of templates.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function getGuildTemplates(bot: Bot, guildId: bigint) {
  const templates = await bot.rest.runMethod<Template[]>(bot.rest, "get", bot.constants.endpoints.GUILD_TEMPLATES(guildId));

  return new Collection(templates.map((template) => [template.code, template]));
}
