import type { Bot } from "../../../bot.ts";
import { GuildWidgetSettings } from "../../../transformers/widgetSettings.ts";
import { DiscordGuildWidgetSettings } from "../../../types/discord.ts";

/** Modify a guild widget object for the guild. Requires the MANAGE_GUILD permission. */
export async function editWidgetSettings(
  bot: Bot,
  guildId: bigint,
  enabled: boolean,
  channelId?: string | null,
): Promise<GuildWidgetSettings> {
  const result = await bot.rest.runMethod<DiscordGuildWidgetSettings>(
    bot.rest,
    "PATCH",
    bot.constants.routes.GUILD_WIDGET(guildId),
    {
      enabled,
      channel_id: channelId,
    },
  );

  return bot.transformers.widgetSettings(bot, result);
}
