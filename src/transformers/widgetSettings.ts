import { Bot } from "../bot.ts";
import { GuildWidgetSettings } from "../types/guilds/guildWidgetSettings.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";

export function transformWidgetSettings(
  bot: Bot,
  payload: SnakeCasedPropertiesDeep<GuildWidgetSettings>
): DiscordenoWidgetSettings {
  return {
    channelId: payload.channel_id ? bot.transformers.snowflake(payload.channel_id) : undefined,
    enabled: payload.enabled,
  };
}

export interface DiscordenoWidgetSettings {
  /** Whether the widget is enabled */
  enabled: boolean;
  /** The widget channel id */
  channelId?: bigint;
}
