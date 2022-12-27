import type { DiscordWelcomeScreen, Optionalize } from '@discordeno/types'
import type { Client } from '../client.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformWelcomeScreen (
  client: Client,
  payload: DiscordWelcomeScreen
) {
  const welcomeScreen = {
    description: payload.description ?? undefined,
    welcomeChannels: payload.welcome_channels.map((channel) => ({
      channelId: client.transformers.snowflake(channel.channel_id),
      description: channel.description,
      emojiId: channel.emoji_id
        ? client.transformers.snowflake(channel.emoji_id)
        : undefined,
      emojiName: channel.emoji_name ?? undefined
    }))
  }

  return welcomeScreen as Optionalize<typeof welcomeScreen>
}

export interface WelcomeScreen
  extends ReturnType<typeof transformWelcomeScreen> {}
