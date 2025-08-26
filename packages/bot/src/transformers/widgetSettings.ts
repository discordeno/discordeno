import type { DiscordGuildWidgetSettings } from '@discordeno/types'
import type { Bot } from '../bot.js'
import type { GuildWidgetSettings } from './types.js'

export function transformWidgetSettings(bot: Bot, payload: DiscordGuildWidgetSettings): GuildWidgetSettings {
  const widget = {
    enabled: payload.enabled,
    channelId: payload.channel_id ?? undefined,
  }

  return bot.transformers.customizers.widgetSettings(bot, payload, widget)
}
