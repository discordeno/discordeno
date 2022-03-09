import { Bot } from "../bot.ts";
import { DiscordWelcomeScreen } from "../types/discord.ts";

export function transformWelcomeScreen(
  bot: Bot,
  payload: DiscordWelcomeScreen,
): DiscordenoWelcomeScreen {
  return {
    description: payload.description ?? undefined,
    welcomeChannels: payload.welcome_channels.map((channel) => ({
      channelId: bot.transformers.snowflake(channel.channel_id),
      description: channel.description,
      emojiId: channel.emoji_id ? bot.transformers.snowflake(channel.emoji_id) : undefined,
      emojiName: channel.emoji_name ?? undefined,
    })),
  };
}

export interface DiscordenoWelcomeScreen {
  /** The server description shown in the welcome screen */
  description?: string;
  /** The channels shown in the welcome screen, up to 5 */
  welcomeChannels: {
    /** The channel's id */
    channelId: bigint;
    /** The descriptino schown for the channel */
    description: string;
    /** The emoji id, if the emoji is custom */
    emojiId?: bigint;
    /** The emoji name if custom, the unicode character if standard, or `null` if no emoji is set */
    emojiName?: string;
  }[];
}
