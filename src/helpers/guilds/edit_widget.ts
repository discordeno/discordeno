import type { GuildWidget } from "../../types/guilds/guild_widget.ts";
import type { Bot } from "../../bot.ts";

/** Modify a guild widget object for the guild. Requires the MANAGE_GUILD permission. */
export async function editWidget(bot: Bot, guildId: bigint, enabled: boolean, channelId?: string | null) {
  await bot.utils.requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

  return await bot.rest.runMethod<GuildWidget>(bot.rest,"patch", bot.constants.endpoints.GUILD_WIDGET(guildId), {
    enabled,
    channel_id: channelId,
  });
}
