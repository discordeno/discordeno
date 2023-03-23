import type { DiscordGuildWidgetSettings } from '@discordeno/types'
import type { Bot } from '../../index.js'
import type { GuildWidgetSettings } from '../widgetSettings.js'

export function transformWidgetSettingsToDiscordWidgetSettings(bot: Bot, payload: GuildWidgetSettings): DiscordGuildWidgetSettings {
  return {
    enabled: payload.enabled,
    channel_id: payload.channelId ?? null,
  }
}
