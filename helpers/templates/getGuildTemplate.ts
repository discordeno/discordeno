import type { Bot } from "../../bot.ts";
import { Template } from "../../transformers/template.ts";
import { DiscordTemplate } from "../../types/discord.ts";

/** Returns the guild template if it exists */
export async function getGuildTemplate(bot: Bot, templateCode: string): Promise<Template> {
  const result = await bot.rest.runMethod<DiscordTemplate>(
    bot.rest,
    "GET",
    bot.constants.routes.TEMPLATE(templateCode),
  );

  return bot.transformers.template(bot, result);
}
