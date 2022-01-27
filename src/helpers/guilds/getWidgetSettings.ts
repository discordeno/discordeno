import type { GuildWidgetSettings } from "../../types/guilds/guildWidgetSettings.ts";
import type { Bot } from "../../bot.ts";

/** Returns the guild widget object. Requires the MANAGE_GUILD permission. */
export async function getWidgetSettings(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<GuildWidgetSettings>(
    bot.rest,
    "get",
    bot.constants.endpoints.GUILD_WIDGET(guildId)
  );

  return bot.transformers.widgetSettings(bot, result);
}
