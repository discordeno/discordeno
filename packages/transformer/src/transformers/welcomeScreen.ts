import type { Camelize, DiscordWelcomeScreen } from '@discordeno/types'

export function c1amelize1WelcomeScreen (
  payload: DiscordWelcomeScreen
): Camelize<DiscordWelcomeScreen> {
  return {
    description: payload.description,
    welcomeChannels: payload.welcome_channels.map((welcomeScreenChannel) => ({
      channelId: welcomeScreenChannel.channel_id,
      description: welcomeScreenChannel.description,
      emojiId: welcomeScreenChannel.emoji_id,
      emojiName: welcomeScreenChannel.emoji_name
    }))
  }
}
