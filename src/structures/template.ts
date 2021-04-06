import { cache } from "../cache.ts";
import { DiscordTemplate, Template } from "../types/templates/template.ts";
import { createNewProp, snakeKeysToCamelCase } from "../util/utils.ts";
import { GuildStruct } from "./guild.ts";

const baseTemplate: Partial<TemplateStruct> = {
  get sourceGuild() {
    return cache.guilds.get(this.sourceGuildId!);
  },
};

/** Create a structure object  */
// deno-lint-ignore require-await
export async function createTemplateStruct(
  data: DiscordTemplate,
) {
  const rest = snakeKeysToCamelCase(data) as Template;

  const props: Record<string, Partial<PropertyDescriptor>> = {};
  for (const key of Object.keys(rest)) {
    // @ts-ignore index signature
    props[key] = createNewProp(rest[key]);
  }

  const template: TemplateStruct = Object.create(baseTemplate, props);

  return template;
}

export interface TemplateStruct extends Template {
  // GETTERS

  sourceGuild: GuildStruct | undefined;
}
