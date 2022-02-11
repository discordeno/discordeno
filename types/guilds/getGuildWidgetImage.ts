import { GetGuildWidgetImageStyleOptions } from "./getGuildWidgetImageStyleOptions.ts";

/** https://discord.com/developers/docs/resources/guild#get-guild-widget-image-query-string-params */
export interface GetGuildWidgetImageQuery {
  /** Style of the widget returned, default: shield */
  style?: GetGuildWidgetImageStyleOptions;
}
