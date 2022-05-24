import type { Bot } from "../../bot.ts";
import { DiscordTemplate } from "../../types/discord.ts";

/**
 * Deletes a template from a guild.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function deleteGuildTemplate(bot: Bot, guildId: bigint, templateCode: string) {
  await bot.rest.runMethod<DiscordTemplate>(
    bot.rest,
    "DELETE",
    `${bot.constants.endpoints.GUILD_TEMPLATES(guildId)}/${templateCode}`,
  );
}
