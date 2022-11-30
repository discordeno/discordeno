import type { Bot } from "../../bot.ts";
import { Template } from "../../transformers/template.ts";
import { DiscordTemplate } from "../../types/discord.ts";
import { BigString } from "../../types/shared.ts";

/**
 * Edits a template's settings.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to edit a template of.
 * @param templateCode - The code of the template to edit.
 * @param options - The parameters for the edit of the template.
 * @returns An instance of the edited {@link Template}.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * Fires a _Guild Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-template#modify-guild-template}
 */
export async function editGuildTemplate(
  bot: Bot,
  guildId: BigString,
  templateCode: string,
  options: ModifyGuildTemplate,
): Promise<Template> {
  if (options.name?.length && (options.name.length < 1 || options.name.length > 100)) {
    throw new Error("The name can only be in between 1-100 characters.");
  }

  if (options.description?.length && options.description.length > 120) {
    throw new Error("The description can only be in between 0-120 characters.");
  }

  const result = await bot.rest.runMethod<DiscordTemplate>(
    bot.rest,
    "PATCH",
    bot.constants.routes.GUILD_TEMPLATE(guildId, templateCode),
    {
      name: options.name,
      description: options.description,
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
