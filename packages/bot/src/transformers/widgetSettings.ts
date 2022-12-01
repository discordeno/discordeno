import { Bot } from '../bot.js'
import { DiscordGuildWidgetSettings } from '../types/discord.js'
import { Optionalize } from '../types/shared.js'

export function transformWidgetSettings (bot: Bot, payload: DiscordGuildWidgetSettings) {
  const widget = {
    enabled: payload.enabled,
    channelId: payload.channel_id ?? undefined
  }

  return widget as Optionalize<typeof widget>
}

export interface GuildWidgetSettings extends ReturnType<typeof transformWidgetSettings> { }
