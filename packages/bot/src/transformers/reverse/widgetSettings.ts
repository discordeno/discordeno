import { DiscordGuildWidgetSettings } from '@discordeno/types'
import { Bot } from '../../bot.js'
import { GuildWidgetSettings } from '../widgetSettings.js'

export function transformWidgetSettingsToDiscordWidgetSettings (
  bot: Bot,
  payload: GuildWidgetSettings
): DiscordGuildWidgetSettings {
  return {
    enabled: payload.enabled,
    channel_id: payload.channelId ?? null
  }
}
