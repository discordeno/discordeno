import type { Bot } from "../../../bot.ts";
import { GuildWidget } from "../../../transformers/widget.ts";
import { DiscordGuildWidget } from "../../../types/discord.ts";

/** Returns the widget for the guild. */
export async function getWidget(bot: Bot, guildId: bigint): Promise<GuildWidget> {
  const result = await bot.rest.runMethod<DiscordGuildWidget>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_WIDGET_JSON(guildId),
  );

  return bot.transformers.widget(bot, result);
}
