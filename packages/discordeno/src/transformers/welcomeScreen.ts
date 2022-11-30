import { Bot } from '../bot.js'
import { DiscordWelcomeScreen } from '../types/discord.js'
import { Optionalize } from '../types/shared.js'

export function transformWelcomeScreen(bot: Bot, payload: DiscordWelcomeScreen) {
  const welcomeScreen = {
    description: payload.description ?? undefined,
    welcomeChannels: payload.welcome_channels.map((channel) => ({
      channelId: bot.transformers.snowflake(channel.channel_id),
      description: channel.description,
      emojiId: channel.emoji_id ? bot.transformers.snowflake(channel.emoji_id) : undefined,
      emojiName: channel.emoji_name ?? undefined
    }))
  }

  return welcomeScreen as Optionalize<typeof welcomeScreen>
}

export interface WelcomeScreen extends ReturnType<typeof transformWelcomeScreen> { }
