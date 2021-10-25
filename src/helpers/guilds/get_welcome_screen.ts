import type { WelcomeScreen } from "../../types/guilds/welcome_screen.ts";
import type { Bot } from "../../bot.ts";

export async function getWelcomeScreen(bot: Bot, guildId: bigint) {
  return await bot.rest.runMethod<WelcomeScreen>(
    bot.rest,
    "get",
    bot.constants.endpoints.GUILD_WELCOME_SCREEN(guildId)
  );
}
