import { Bot } from "../bot.ts";
import { DiscordGuildWidgetSettings } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";

export function transformWidgetSettings(bot: Bot, payload: DiscordGuildWidgetSettings) {
  const widget = {
    enabled: payload.enabled,
    channelId: payload.channel_id ?? undefined,
  };

  return widget as Optionalize<typeof widget>;
}

export interface GuildWidgetSettings extends ReturnType<typeof transformWidgetSettings> {}
