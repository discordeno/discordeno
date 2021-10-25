import type { ModifyGuildWelcomeScreen } from "../../types/guilds/modify_guild_welcome_screen.ts";
import type { WelcomeScreen } from "../../types/guilds/welcome_screen.ts";
import type { Bot } from "../../bot.ts";

export async function editWelcomeScreen(bot: Bot, guildId: bigint, options: ModifyGuildWelcomeScreen) {
  return await bot.rest.runMethod<WelcomeScreen>(bot.rest, "patch", bot.constants.endpoints.GUILD_WELCOME_SCREEN(guildId), {
    enabled: options.enabled,
    welcomeScreen: options.welcomeScreen?.map((welcomeScreen) => {
      return {
        channel_id: welcomeScreen.channelId,
        description: welcomeScreen.description,
        emoji_id: welcomeScreen.emojiId,
        emoji_name: welcomeScreen.emojiName,
      };
    }),
    description: options.description,
  });
}
