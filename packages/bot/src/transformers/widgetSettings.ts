import type { DiscordGuildWidgetSettings } from '@discordeno/types'
import type { Bot } from '../index.js'

export function transformWidgetSettings(bot: Bot, payload: DiscordGuildWidgetSettings): GuildWidgetSettings {
  const widget = {
    enabled: payload.enabled,
    channelId: payload.channel_id ?? undefined,
  }

  return bot.transformers.customizers.widgetSettings(bot, payload, widget)
}

export interface GuildWidgetSettings {
  channelId?: string
  enabled: boolean
}
