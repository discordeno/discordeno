import { Bot } from "../bot.ts";
import { DiscordGuildWidgetSettings, Optionalize } from "../deps.ts";

export function transformWidgetSettings(bot: Bot, payload: DiscordGuildWidgetSettings) {
  const widget = {
    enabled: payload.enabled,
    channelId: payload.channel_id ?? undefined,
  };

  return widget as Optionalize<typeof widget>;
}

export interface GuildWidgetSettings extends ReturnType<typeof transformWidgetSettings> {}
