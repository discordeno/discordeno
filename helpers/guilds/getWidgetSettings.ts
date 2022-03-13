import type { Bot } from "../../bot.ts";
import { DiscordGuildWidget } from "../../types/discord.ts";

/** Returns the guild widget object. Requires the MANAGE_GUILD permission. */
export async function getWidgetSettings(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<DiscordGuildWidget>(
    bot.rest,
    "get",
    bot.constants.endpoints.GUILD_WIDGET(guildId),
  );

  return bot.transformers.widget(bot, result);
}
