import type { Bot } from "../../bot.ts";
import { DiscordTemplate } from "../../types/discord.ts";

/** Returns the guild template if it exists */
export async function getTemplate(bot: Bot, templateCode: string) {
  const result = await bot.rest.runMethod<DiscordTemplate>(
    bot.rest,
    "GET",
    bot.constants.endpoints.GUILD_TEMPLATE(templateCode),
  );

  return bot.transformers.template(bot, result);
}
