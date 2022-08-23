import { Bot } from "../../bot.ts";
import { DiscordGuildWidgetSettings } from "../../types/discord.ts";
import { GuildWidgetSettings } from "../widgetSettings.ts";

export function transformWidgetSettingsToDiscordWidgetSettings(
  bot: Bot,
  payload: GuildWidgetSettings,
): DiscordGuildWidgetSettings {
  return {
    enabled: payload.enabled,
    channel_id: payload.channelId ?? null,
  };
}
