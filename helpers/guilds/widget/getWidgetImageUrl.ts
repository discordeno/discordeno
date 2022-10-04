import type { Bot } from "../../../bot.ts";
import { BigString } from "../../../types/shared.ts";

/**
 * Builds a URL to the guild widget image stored in the Discord CDN.
 *
 * @param bot - The bot instance to use to build the URL.
 * @param guildId - The ID of the guild to get the link to the widget image for.
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource.
 */
export function getWidgetImageURL(bot: Bot, guildId: BigString, options?: GetGuildWidgetImageQuery): string {
  return bot.constants.routes.GUILD_WIDGET_IMAGE(guildId, options?.style);
}

/** https://discord.com/developers/docs/resources/guild#get-guild-widget-image-query-string-params */
export interface GetGuildWidgetImageQuery {
  /**
   * Style of the widget returned, default: shield
   *
   * Shield: Widget with Discord icon and guild members online count.
   * Banner1: Large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget
   * Banner2: Smaller widget style with guild icon, name and online count. Split on the right with Discord logo
   * Banner3: Large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right
   * Banner4: Large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget and a "JOIN MY SERVER" button at the bottom
   */
  style?:
    | "shield"
    | "banner1"
    | "banner2"
    | "banner3"
    | "banner4";
}
