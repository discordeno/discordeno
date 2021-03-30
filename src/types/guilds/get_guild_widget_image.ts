import { SnakeCaseProps } from "../util.ts";
import { DiscordGetGuildWidgetImageStyleOptions } from "./get_guild_widget_image_style_options.ts";

export interface GetGuildWidgetImage {
  /** Style of the widget returned, default: shield */
  style?: DiscordGetGuildWidgetImageStyleOptions;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-integration */
export type DiscordGetGuildWidgetImage = SnakeCaseProps<
  GetGuildWidgetImage
>;
