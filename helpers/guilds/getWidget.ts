import type { Bot } from "../../bot.ts";
import { DiscordGuildWidget } from "../../types/discord.ts";

/** Returns the widget for the guild. */
export async function getWidget(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<DiscordGuildWidget>(
    bot.rest,
    "get",
    `${bot.constants.endpoints.GUILD_WIDGET(guildId)}.json`,
  );

  return bot.transformers.widget(bot, result);
}
