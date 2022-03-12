import type { Bot } from "../../bot.ts";
import { DiscordTemplate } from "../../types/discord.ts";

/** Returns the guild template if it exists */
export async function getTemplate(bot: Bot, templateCode: string) {
  return await bot.rest.runMethod<DiscordTemplate>(bot.rest, "get", bot.constants.endpoints.GUILD_TEMPLATE(templateCode));
}
