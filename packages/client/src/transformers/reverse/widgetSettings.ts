import type { DiscordGuildWidgetSettings } from '@discordeno/types'
import type { Client } from '../../client.js'
import type { GuildWidgetSettings } from '../widgetSettings.js'

export function transformWidgetSettingsToDiscordWidgetSettings (
  client: Client,
  payload: GuildWidgetSettings
): DiscordGuildWidgetSettings {
  return {
    enabled: payload.enabled,
    channel_id: payload.channelId ?? null
  }
}
