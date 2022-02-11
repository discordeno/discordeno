import { Bot } from "../bot.ts";
import { GuildWidget } from "../types/guilds/guildWidget.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";

export function transformWidget(bot: Bot, payload: SnakeCasedPropertiesDeep<GuildWidget>): DiscordenoWidget {
  return {
    channelId: payload.channel_id ? bot.transformers.snowflake(payload.channel_id) : undefined,
    enabled: payload.enabled,
  };
}

export interface DiscordenoWidget {
  /** Whether the widget is enabled */
  enabled: boolean;
  /** The widget channel id */
  channelId?: bigint;
}
