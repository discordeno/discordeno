import type { GuildWidget } from "../../types/guilds/guild_widget.ts";
import type { Bot } from "../../bot.ts";

/** Returns the guild widget object. Requires the MANAGE_GUILD permission. */
export async function getWidgetSettings(bot: Bot, guildId: bigint) {
  await bot.utils.requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  return await bot.rest.runMethod<GuildWidget>(bot.rest, "get", bot.constants.endpoints.GUILD_WIDGET(guildId));
}
