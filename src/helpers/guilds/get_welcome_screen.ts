import { rest } from "../../rest/rest.ts";
import { WelcomeScreen } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";

export async function getWelcomeScreen(guildId: bigint) {
  return await rest.runMethod<WelcomeScreen>(
    "get",
    endpoints.GUILD_WELCOME_SCREEN(guildId),
  );
}
