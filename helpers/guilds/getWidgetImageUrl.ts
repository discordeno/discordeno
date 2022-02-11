import type { Bot } from "../../bot.ts";
import type { GetGuildWidgetImageQuery } from "../../types/guilds/getGuildWidgetImage.ts";

/** Returns the widget image URL for the guild. */
export async function getWidgetImageURL(bot: Bot, guildId: bigint, options?: GetGuildWidgetImageQuery) {
  return `${bot.constants.endpoints.GUILD_WIDGET(guildId)}.png?style=${options?.style ?? "shield"}`;
}
