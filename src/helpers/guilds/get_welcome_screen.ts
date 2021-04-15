import { rest } from "../../rest/rest.ts";
import { WelcomeScreen } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

export async function getWelcomeScreen(guildId: string) {
  const result = await rest.runMethod(
    "get",
    endpoints.GUILD_WELCOME_SCREEN(guildId),
  );

  return snakeKeysToCamelCase<WelcomeScreen>(result);
}
