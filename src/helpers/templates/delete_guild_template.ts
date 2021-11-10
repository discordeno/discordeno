import type { Template } from "../../types/templates/template.ts";
import type { Bot } from "../../bot.ts";

/**
 * Deletes a template from a guild.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function deleteGuildTemplate(bot: Bot, guildId: bigint, templateCode: string) {
  return await bot.rest.runMethod<Template>(
    bot.rest,
    "delete",
    `${bot.constants.endpoints.GUILD_TEMPLATES(guildId)}/${templateCode}`
  );
}
