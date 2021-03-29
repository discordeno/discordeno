import { SnakeCaseProps } from "../util.ts";
import { GetGuildWidgetImageStyleOptions } from "./get_guild_widget_image_style_options.ts";

export interface GetGuildWidgetImageParams {
  /** Style of the widget returned, default: shield */
  style?: GetGuildWidgetImageStyleOptions;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-integration */
export type DiscordGetGuildWidgetImageParams = SnakeCaseProps<
  GetGuildWidgetImageParams
>;
