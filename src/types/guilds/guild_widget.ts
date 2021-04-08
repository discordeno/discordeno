import { SnakeCasedPropertiesDeep } from "../util.ts";

export interface GuildWidget {
  /** Whether the widget is enabled */
  enabled: boolean;
  /** The widget channel id */
  channelId: string | null;
}

/** https://discord.com/developers/docs/resources/guild#guild-widget-object-guild-widget-structure */
export type DiscordGuildWidget = SnakeCasedPropertiesDeep<GuildWidget>;
