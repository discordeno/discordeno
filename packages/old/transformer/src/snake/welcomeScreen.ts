import type { Camelize, DiscordWelcomeScreen } from '@discordeno/types'

export function s1nakelize1WelcomeScreen (payload: Camelize<DiscordWelcomeScreen>): DiscordWelcomeScreen {
  return {
    description: payload.description,

    welcome_channels: payload.welcomeChannels.map((welcomeScreenChannel) => ({
      description: welcomeScreenChannel.description,

      channel_id: welcomeScreenChannel.channelId,
      emoji_id: welcomeScreenChannel.emojiId,
      emoji_name: welcomeScreenChannel.emojiName
    }))
  }
}
