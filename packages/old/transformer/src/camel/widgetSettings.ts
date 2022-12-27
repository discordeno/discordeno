import type { Camelize, DiscordGuildWidgetSettings } from '@discordeno/types'

export function c1amelize1WidgetSettings (
  payload: DiscordGuildWidgetSettings
): Camelize<DiscordGuildWidgetSettings> {
  return {
    enabled: payload.enabled,
    channelId: payload.channel_id
  }
}
