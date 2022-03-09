import type { Bot } from "../../bot.ts";
import { DiscordApplication } from "../../types/discord.ts";

/** Get the applications info */
export async function getApplicationInfo(bot: Bot) {
  const result = await bot.rest.runMethod<DiscordApplication>(bot.rest, "get", bot.constants.endpoints.OAUTH2_APPLICATION);

  return bot.transformers.application(bot, result);
}
