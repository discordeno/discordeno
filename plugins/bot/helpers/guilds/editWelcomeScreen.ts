import { Bot } from "../../bot.ts";
import { DiscordWelcomeScreen } from "../../deps.ts";

export async function editWelcomeScreen(bot: Bot, guildId: bigint, options: ModifyGuildWelcomeScreen) {
  const result = await bot.rest.runMethod<DiscordWelcomeScreen>(
    bot.rest,
    "PATCH",
    bot.constants.routes.GUILD_WELCOME_SCREEN(guildId),
    {
      enabled: options.enabled,
      welcome_screen: options.welcomeScreen?.map((welcomeScreen) => ({
        channel_id: welcomeScreen.channelId,
        description: welcomeScreen.description,
        emoji_id: welcomeScreen.emojiId,
        emoji_name: welcomeScreen.emojiName,
      })),
      description: options.description,
    },
  );

  return bot.transformers.welcomeScreen(bot, result);
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen */
export interface ModifyGuildWelcomeScreen {
  /** Whether the welcome screen is enabled */
  enabled?: boolean | null;
  /** Channels linked in the welcome screen and their display options */
  welcomeScreen?: WelcomeScreenChannel[] | null;
  /** The server description to show in the welcome screen */
  description?: string | null;
}

export interface WelcomeScreenChannel {
  /** The channel's id */
  channelId: bigint;
  /** The emoji id, if the emoji is custom */
  emojiId?: bigint;
  /** The emoji name if custom, the unicode character if standard, or `null` if no emoji is set */
  emojiName?: string;
  /** The description shown for the channel */
  description: string;
}
