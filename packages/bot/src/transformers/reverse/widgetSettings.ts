import type { DiscordGuildWidgetSettings } from '@discordeno/types'
import type { Bot } from '../../bot.js'
import type { GuildWidgetSettings } from '../types.js'

export function transformWidgetSettingsToDiscordWidgetSettings(_bot: Bot, payload: GuildWidgetSettings): DiscordGuildWidgetSettings {
  return {
    enabled: payload.enabled,
    channel_id: payload.channelId ?? null,
  }
}
