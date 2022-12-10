import type { DiscordGuildWidgetSettings } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { GuildWidgetSettings } from '../widgetSettings.js'

export function transformWidgetSettingsToDiscordWidgetSettings (
  bot: RestManager,
  payload: GuildWidgetSettings
): DiscordGuildWidgetSettings {
  return {
    enabled: payload.enabled,
    channel_id: payload.channelId ?? null
  }
}
