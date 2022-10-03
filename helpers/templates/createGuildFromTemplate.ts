import type { Bot } from "../../bot.ts";
import { Guild } from "../../transformers/guild.ts";
import { DiscordGuild } from "../../types/discord.ts";

/**
 * Creates a guild from a template.
 *
 * @param bot - The bot instance to use to make the request.
 * @param templateCode - The code of the template.
 * @param options - The parameters for the creation of the guild.
 * @returns An instance of the created {@link Guild}.
 *
 * @remarks
 * ⚠️ This route can only be used by bots in __fewer than 10 guilds__.
 *
 * Fires a _Guild Create_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-template#create-guild-from-guild-template}
 */
export async function createGuildFromTemplate(
  bot: Bot,
  templateCode: string,
  options: CreateGuildFromTemplate,
): Promise<Guild> {
  if (options.icon) {
    options.icon = await bot.utils.urlToBase64(options.icon);
  }

  const createdGuild = await bot.rest.runMethod<DiscordGuild>(
    bot.rest,
    "POST",
    bot.constants.routes.TEMPLATE(templateCode),
    options,
  );

  return bot.transformers.guild(bot, {
    guild: createdGuild,
    shardId: bot.utils.calculateShardId(bot.gateway, bot.transformers.snowflake(createdGuild.id)),
  });
}

/** https://discord.com/developers/docs/resources/template#create-guild-from-template-json-params */
export interface CreateGuildFromTemplate {
  /** Name of the guild (2-100 characters) */
  name: string;
  /** base64 128x128 image for the guild icon */
  icon?: string;
}
