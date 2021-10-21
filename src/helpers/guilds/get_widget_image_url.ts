import type { Bot } from "../../bot.ts";
import type { GetGuildWidgetImageQuery } from "../../types/guilds/get_guild_widget_image.ts";

/** Returns the widget image URL for the guild. */
export async function getWidgetImageURL(bot: Bot, guildId: bigint, options?: GetGuildWidgetImageQuery & { force?: boolean }) {
  if (!options?.force) {
    const guild = await bot.cache.guilds.get(guildId);
    if (!guild) throw new Error(bot.constants.Errors.GUILD_NOT_FOUND);
    if (!guild.widgetEnabled) throw new Error(bot.constants.Errors.GUILD_WIDGET_NOT_ENABLED);
  }

  return `${bot.constants.endpoints.GUILD_WIDGET(guildId)}.png?style=${options?.style ?? "shield"}`;
}
