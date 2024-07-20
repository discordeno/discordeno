import type { DiscordWelcomeScreen } from '@discordeno/types'
import type { Bot, WelcomeScreen } from '../index.js'

export function transformWelcomeScreen(bot: Bot, payload: DiscordWelcomeScreen): WelcomeScreen {
  const welcomeScreen = {
    description: payload.description ?? undefined,
    welcomeChannels: payload.welcome_channels.map((channel) => ({
      channelId: bot.transformers.snowflake(channel.channel_id),
      description: channel.description,
      emojiId: channel.emoji_id ? bot.transformers.snowflake(channel.emoji_id) : undefined,
      emojiName: channel.emoji_name ?? undefined,
    })),
  } as WelcomeScreen

  return bot.transformers.customizers.welcomeScreen(bot, payload, welcomeScreen)
}
