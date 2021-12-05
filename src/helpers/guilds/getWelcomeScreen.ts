import type { WelcomeScreen } from "../../types/guilds/welcomeScreen.ts";
import type { Bot } from "../../bot.ts";

export async function getWelcomeScreen(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<WelcomeScreen>(
    bot.rest,
    "get",
    bot.constants.endpoints.GUILD_WELCOME_SCREEN(guildId)
  );

  return bot.transformers.welcomeScreen(bot, result);
}
