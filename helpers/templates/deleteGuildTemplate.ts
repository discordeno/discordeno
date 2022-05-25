import type { Bot } from "../../bot.ts";
import { DiscordTemplate } from "../../types/discord.ts";

/**
 * Deletes a template from a guild.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function deleteGuildTemplate(bot: Bot, guildId: bigint, templateCode: string) {
  await bot.rest.runMethod<DiscordTemplate>(
    bot.rest,
    "delete",
    bot.constants.routes.GUILD_TEMPLATE(guildId, templateCode),
  );
}
