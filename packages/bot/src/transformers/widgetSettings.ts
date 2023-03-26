import type { DiscordGuildWidgetSettings } from '@discordeno/types'
import type { Bot } from '../index.js'
import type { Optionalize } from '../optionalize.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformWidgetSettings(bot: Bot, payload: DiscordGuildWidgetSettings) {
  const widget = {
    enabled: payload.enabled,
    channelId: payload.channel_id ?? undefined,
  }

  return widget as Optionalize<typeof widget>
}

export interface GuildWidgetSettings extends ReturnType<typeof transformWidgetSettings> {}
