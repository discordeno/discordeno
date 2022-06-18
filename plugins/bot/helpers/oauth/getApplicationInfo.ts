import { Bot } from "../../bot.ts";
import { DiscordApplication } from "../../deps.ts";

/** Get the applications info */
export async function getApplicationInfo(bot: Bot) {
  const result = await bot.rest.runMethod<DiscordApplication>(
    bot.rest,
    "GET",
    bot.constants.routes.OAUTH2_APPLICATION(),
  );

  return bot.transformers.application(bot, result);
}
