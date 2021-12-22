import type { ModifyGuildWelcomeScreen } from "../../types/guilds/modifyGuildWelcomeScreen.ts";
import type { WelcomeScreen } from "../../types/guilds/welcomeScreen.ts";
import type { Bot } from "../../bot.ts";

export async function editWelcomeScreen(bot: Bot, guildId: bigint, options: ModifyGuildWelcomeScreen) {
  const result = await bot.rest.runMethod<WelcomeScreen>(
    bot.rest,
    "patch",
    bot.constants.endpoints.GUILD_WELCOME_SCREEN(guildId),
    {
      enabled: options.enabled,
      welcome_screen: options.welcomeScreen?.map((welcomeScreen) => ({
        channel_id: welcomeScreen.channelId,
        description: welcomeScreen.description,
        emoji_id: welcomeScreen.emojiId,
        emoji_name: welcomeScreen.emojiName,
      })),
      description: options.description,
    }
  );

  return bot.transformers.welcomeScreen(bot, result);
}
