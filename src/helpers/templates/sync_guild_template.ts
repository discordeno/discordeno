import type { Template } from "../../types/templates/template.ts";
import type { Bot } from "../../bot.ts";

/**
 * Syncs the template to the guild's current state.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function syncGuildTemplate(bot: Bot, guildId: bigint, templateCode: string) {
  await bot.utils.requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

  return await bot.rest.runMethod<Template>(
    bot.rest,
    "put",
    `${bot.constants.endpoints.GUILD_TEMPLATES(guildId)}/${templateCode}`
  );
}
