import { DiscordGetGuildWidgetImageStyleOptions } from "./get_guild_widget_image_style_options.ts";

/** https://discord.com/developers/docs/resources/guild#get-guild-widget-image-query-string-params */
export interface GetGuildWidgetImageQuery {
  /** Style of the widget returned, default: shield */
  style?: DiscordGetGuildWidgetImageStyleOptions;
}
