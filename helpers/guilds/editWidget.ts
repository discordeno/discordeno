import type { Bot } from "../../bot.ts";
import { DiscordGuildWidgetSettings } from "../../types/discord.ts";

/** Modify a guild widget object for the guild. Requires the MANAGE_GUILD permission. */
export async function editWidget(bot: Bot, guildId: bigint, enabled: boolean, channelId?: string | null) {
  const result = await bot.rest.runMethod<DiscordGuildWidgetSettings>(
    bot.rest,
    "patch",
    bot.constants.routes.GUILD_WIDGET(guildId),
    {
      enabled,
      channel_id: channelId,
    },
  );

  return bot.transformers.widgetSettings(bot, result);
}
