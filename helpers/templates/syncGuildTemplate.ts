import type { Bot } from "../../bot.ts";
import { Template } from "../../transformers/template.ts";
import { DiscordTemplate } from "../../types/discord.ts";

/**
 * Syncs the template to the guild's current state.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function syncGuildTemplate(bot: Bot, guildId: bigint, templateCode: string): Promise<Template> {
  const result = await bot.rest.runMethod<DiscordTemplate>(
    bot.rest,
    "PUT",
    bot.constants.routes.GUILD_TEMPLATE(guildId, templateCode),
  );

  return bot.transformers.template(bot, result);
}
