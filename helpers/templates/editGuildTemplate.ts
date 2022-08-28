import type { Bot } from "../../bot.ts";
import { Template } from "../../transformers/template.ts";
import { DiscordTemplate } from "../../types/discord.ts";

/**
 * Edit a template's metadata.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function editGuildTemplate(
  bot: Bot,
  guildId: bigint,
  templateCode: string,
  data: ModifyGuildTemplate,
): Promise<Template> {
  if (data.name?.length && (data.name.length < 1 || data.name.length > 100)) {
    throw new Error("The name can only be in between 1-100 characters.");
  }

  if (data.description?.length && data.description.length > 120) {
    throw new Error("The description can only be in between 0-120 characters.");
  }

  const result = await bot.rest.runMethod<DiscordTemplate>(
    bot.rest,
    "PATCH",
    bot.constants.routes.GUILD_TEMPLATE(guildId, templateCode),
    {
      name: data.name,
      description: data.description,
    },
  );

  return bot.transformers.template(bot, result);
}

/** https://discord.com/developers/docs/resources/template#modify-guild-template */
export interface ModifyGuildTemplate {
  /** Name of the template (1-100 characters) */
  name?: string;
  /** Description of the template (0-120 characters) */
  description?: string | null;
}
