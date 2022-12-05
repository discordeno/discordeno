import type {
  DiscordGuildWidgetSettings,
  Optionalize
} from '@discordeno/types'
import type { Client } from '../client.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformWidgetSettings (
  client: Client,
  payload: DiscordGuildWidgetSettings
) {
  const widget = {
    enabled: payload.enabled,
    channelId: payload.channel_id ?? undefined
  }

  return widget as Optionalize<typeof widget>
}

export interface GuildWidgetSettings
  extends ReturnType<typeof transformWidgetSettings> {}
