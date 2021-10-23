import type { GuildWidgetDetails } from "../../types/guilds/guild_widget_details.ts";
import type { Bot } from "../../bot.ts";

/** Returns the widget for the guild. */
export async function getWidget(bot: Bot, guildId: bigint, options?: { force: boolean }) {
  if (!options?.force) {
    const guild = await bot.cacahe.guilds.get(guildId);
    if (!guild) throw new Error(bot.constants.Errors.GUILD_NOT_FOUND);
    if (!guild?.widgetEnabled) throw new Error(bot.constants.Errors.GUILD_WIDGET_NOT_ENABLED);
  }

  return await bot.rest.runMethod<GuildWidgetDetails>(
    bot.rest,
    "get",
    `${bot.constants.endpoints.GUILD_WIDGET(guildId)}.json`
  );
}
