import { cacheHandlers } from "../../cache.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns the widget image URL for the guild. */
export async function getWidgetImageURL(
  guildId: string,
  options?: {
    style?: "shield" | "banner1" | "banner2" | "banner3" | "banner4";
    force?: boolean;
  },
) {
  if (!options?.force) {
    const guild = await cacheHandlers.get("guilds", guildId);
    if (!guild) throw new Error(Errors.GUILD_NOT_FOUND);
    if (!guild.widgetEnabled) throw new Error(Errors.GUILD_WIDGET_NOT_ENABLED);
  }

  return `${endpoints.GUILD_WIdGET(guildId)}.png?style=${options?.style ??
    "shield"}`;
}
