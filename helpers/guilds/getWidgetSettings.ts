import type { Bot } from "../../bot.ts";
import { DiscordGuildWidgetSettings } from "../../types/discord.ts";

/** Returns a guild widget settings object. Requires the MANAGE_GUILD permission. */
export async function getWidgetSettings(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<DiscordGuildWidgetSettings>(
    bot.rest,
    "get",
    bot.constants.endpoints.GUILD_WIDGET(guildId),
  );

  return bot.transformers.widgetSettings(bot, result);
}
