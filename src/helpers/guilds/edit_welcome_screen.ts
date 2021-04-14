import { rest } from "../../rest/rest.ts";
import { ModifyGuildWelcomeScreen } from "../../types/guilds/modify_guild_welcome_screen.ts";
import { WelcomeScreen } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import {
  camelKeysToSnakeCase,
  snakeKeysToCamelCase,
} from "../../util/utils.ts";

export async function editWelcomeScreen(
  guildId: string,
  options: ModifyGuildWelcomeScreen,
) {
  const result = await rest.runMethod(
    "patch",
    endpoints.GUILD_WELCOME_SCREEN(guildId),
    camelKeysToSnakeCase(options),
  );

  return snakeKeysToCamelCase<WelcomeScreen>(result);
}
