import type { Bot } from "../../bot.ts";
import { Template } from "../../transformers/template.ts";
import { DiscordTemplate } from "../../types/discord.ts";
import { BigString } from "../../types/shared.ts";

/**
 * Creates a template from a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to create the template from.
 * @param options - The parameters for the creation of the template.
 * @returns An instance of the created {@link Template}.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * Fires a _Guild Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-template#create-guild-template}
 */
export async function createGuildTemplate(bot: Bot, guildId: BigString, options: CreateTemplate): Promise<Template> {
  const result = await bot.rest.runMethod<DiscordTemplate>(
    bot.rest,
    "POST",
    bot.constants.routes.GUILD_TEMPLATES(guildId),
    options,
  );

  return bot.transformers.template(bot, result);
}

export interface CreateTemplate {
  /** Name which the template should have */
  name: string;
  /** Description of the template */
  description?: string;
}
