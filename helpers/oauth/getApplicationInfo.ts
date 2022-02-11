import { Application } from "../../types/applications/application.ts";
import type { Bot } from "../../bot.ts";

/** Get the applications info */
export async function getApplicationInfo(bot: Bot) {
  const result = await bot.rest.runMethod<Application>(bot.rest, "get", bot.constants.endpoints.OAUTH2_APPLICATION);

  return bot.transformers.application(bot, result);
}
