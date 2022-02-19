/** https://discord.com/developers/docs/resources/guild#guild-widget-settings-object-guild-widget-settings-structure */
export interface GuildWidgetSettings {
  /** Whether the widget is enabled */
  enabled: boolean;
  /** The widget channel id */
  channelId: string | null;
}
