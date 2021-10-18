import { Application } from "../../types/applications/application.ts";
import { Bot } from "../../bot.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

/** Get the applications info */
export async function getApplicationInfo(bot: Bot) {
  return await bot.rest.runMethod<SnakeCasedPropertiesDeep<Omit<Application, "flags">>>(
    bot.rest,
    "get",
    bot.constants.endpoints.OAUTH2_APPLICATION
  );
}
