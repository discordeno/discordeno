import { DiscordGuildWidgetSettings } from '@discordeno/types'
import { Client } from '../../client.js'
import { GuildWidgetSettings } from '../widgetSettings.js'

export function transformWidgetSettingsToDiscordWidgetSettings (
  client: Client,
  payload: GuildWidgetSettings
): DiscordGuildWidgetSettings {
  return {
    enabled: payload.enabled,
    channel_id: payload.channelId ?? null
  }
}
