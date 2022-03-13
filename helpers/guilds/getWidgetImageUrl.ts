import type { Bot } from "../../bot.ts";

/** Returns the widget image URL for the guild. */
export async function getWidgetImageURL(bot: Bot, guildId: bigint, options?: GetGuildWidgetImageQuery) {
  return `${bot.constants.endpoints.GUILD_WIDGET(guildId)}.png?style=${options?.style ?? "shield"}`;
}

/** https://discord.com/developers/docs/resources/guild#get-guild-widget-image-query-string-params */
export interface GetGuildWidgetImageQuery {
  /** Style of the widget returned, default: shield */
  style?: GetGuildWidgetImageStyleOptions;
}

/** https://discord.com/developers/docs/resources/guild#get-guild-widget-image-widget-style-options */
export enum GetGuildWidgetImageStyleOptions {
  /** Shield style widget with Discord icon and guild members online count */
  Shield = "shield",
  /** Large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget */
  Banner1 = "banner1",
  /** Smaller widget style with guild icon, name and online count. Split on the right with Discord logo */
  Banner2 = "banner2",
  /** Large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right */
  Banner3 = "banner3",
  /** Large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget and a "JOIN MY SERVER" button at the bottom */
  Banner4 = "banner4",
}
