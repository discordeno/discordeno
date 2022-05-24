import type { Bot } from "../../bot.ts";
import { DiscordTemplate } from "../../types/discord.ts";

/**
 * Syncs the template to the guild's current state.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function syncGuildTemplate(bot: Bot, guildId: bigint, templateCode: string) {
  return await bot.rest.runMethod<DiscordTemplate>(
    bot.rest,
    "PUT",
    `${bot.constants.endpoints.GUILD_TEMPLATES(guildId)}/${templateCode}`,
  );
}
