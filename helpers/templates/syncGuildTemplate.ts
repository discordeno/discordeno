import type { Bot } from "../../bot.ts";
import { Template } from "../../transformers/template.ts";
import { DiscordTemplate } from "../../types/discord.ts";
import { BigString } from "../../types/shared.ts";

/**
 * Synchronises a template with the current state of a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to synchronise a template of.
 * @returns An instance of the edited {@link Template}.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * Fires a _Guild Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-template#get-guild-templates}
 */
export async function syncGuildTemplate(bot: Bot, guildId: BigString, templateCode: string): Promise<Template> {
  const result = await bot.rest.runMethod<DiscordTemplate>(
    bot.rest,
    "PUT",
    bot.constants.routes.GUILD_TEMPLATE(guildId, templateCode),
  );

  return bot.transformers.template(bot, result);
}
