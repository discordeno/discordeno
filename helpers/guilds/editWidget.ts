import type { GuildWidgetSettings } from "../../types/guilds/guildWidgetSettings.ts";
import type { Bot } from "../../bot.ts";

/** Modify a guild widget object for the guild. Requires the MANAGE_GUILD permission. */
export async function editWidget(bot: Bot, guildId: bigint, enabled: boolean, channelId?: string | null) {
  const result = await bot.rest.runMethod<GuildWidgetSettings>(
    bot.rest,
    "patch",
    bot.constants.endpoints.GUILD_WIDGET(guildId),
    {
      enabled,
      channel_id: channelId,
    },
  );

  return bot.transformers.widgetSettings(bot, result);
}
