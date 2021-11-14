import { Application } from "../../types/applications/application.ts";
import type { Bot } from "../../bot.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

/** Get the applications info */
export async function getApplicationInfo(bot: Bot) {
  return await bot.rest.runMethod<Omit<Application, "flags">>(
    bot.rest,
    "get",
    bot.constants.endpoints.OAUTH2_APPLICATION
  );
}
