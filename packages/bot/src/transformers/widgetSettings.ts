import { DiscordGuildWidgetSettings, Optionalize } from '@discordeno/types'
import { Bot } from '../bot.js'

export function transformWidgetSettings (bot: Bot, payload: DiscordGuildWidgetSettings) {
  const widget = {
    enabled: payload.enabled,
    channelId: payload.channel_id ?? undefined
  }

  return widget as Optionalize<typeof widget>
}

export interface GuildWidgetSettings extends ReturnType<typeof transformWidgetSettings> { }
