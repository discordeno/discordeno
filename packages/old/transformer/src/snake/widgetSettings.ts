import type { Camelize, DiscordGuildWidgetSettings } from '@discordeno/types'

export function s1nakelize1WidgetSettings (payload: Camelize<DiscordGuildWidgetSettings>): DiscordGuildWidgetSettings {
  return {
    enabled: payload.enabled,

    channel_id: payload.channelId
  }
}
