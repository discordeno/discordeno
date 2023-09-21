import type { DiscordWelcomeScreen } from '@discordeno/types'
import type { Bot } from '../index.js'
import type { Optionalize } from '../optionalize.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformWelcomeScreen(bot: Bot, payload: DiscordWelcomeScreen) {
  const welcomeScreen = {
    description: payload.description ?? undefined,
    welcomeChannels: payload.welcome_channels.map((channel) => ({
      channelId: bot.transformers.snowflake(channel.channel_id),
      description: channel.description,
      emojiId: channel.emoji_id ? bot.transformers.snowflake(channel.emoji_id) : undefined,
      emojiName: channel.emoji_name ?? undefined,
    })),
  }

  return bot.transformers.customizers.welcomeScreen(bot, payload, welcomeScreen as WelcomeScreen) as Optionalize<typeof welcomeScreen>
}

export interface WelcomeScreen extends ReturnType<typeof transformWelcomeScreen> {}
