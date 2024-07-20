import type { DiscordGuildWidgetSettings } from '@discordeno/types'
import type { Bot, GuildWidgetSettings } from '../../index.js'

export function transformWidgetSettingsToDiscordWidgetSettings(_bot: Bot, payload: GuildWidgetSettings): DiscordGuildWidgetSettings {
  return {
    enabled: payload.enabled,
    channel_id: payload.channelId ?? null,
  }
}
