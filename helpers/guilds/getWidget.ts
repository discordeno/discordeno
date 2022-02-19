import type { GetGuildWidget } from "../../types/guilds/getGuildWidget.ts";
import type { Bot } from "../../bot.ts";

/** Returns the widget for the guild. */
export async function getWidget(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<GetGuildWidget>(
    bot.rest,
    "get",
    `${bot.constants.endpoints.GUILD_WIDGET(guildId)}.json`,
  );

  return bot.transformers.getWidget(bot, result);
}
