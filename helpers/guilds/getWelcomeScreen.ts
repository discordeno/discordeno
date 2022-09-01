import type { Bot } from "../../bot.ts";
import { WelcomeScreen } from "../../transformers/welcomeScreen.ts";
import { DiscordWelcomeScreen } from "../../types/discord.ts";

/** Returns the Welcome Screen object for the guild. Requires the `MANAGE_GUILD` permission. */
export async function getWelcomeScreen(bot: Bot, guildId: bigint): Promise<WelcomeScreen> {
  const result = await bot.rest.runMethod<DiscordWelcomeScreen>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_WELCOME_SCREEN(guildId),
  );

  return bot.transformers.welcomeScreen(bot, result);
}
