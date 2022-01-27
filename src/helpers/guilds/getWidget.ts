import type { GuildWidgetDetails } from "../../types/guilds/guildWidgetDetails.ts";
import type { Bot } from "../../bot.ts";

/** Returns the widget for the guild. */
export async function getWidget(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<GuildWidgetDetails>(
    bot.rest,
    "get",
    `${bot.constants.endpoints.GUILD_WIDGET(guildId)}.json`
  );
}
