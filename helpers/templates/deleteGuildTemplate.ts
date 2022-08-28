import type { Bot } from "../../bot.ts";

/**
 * Deletes a template from a guild.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function deleteGuildTemplate(bot: Bot, guildId: bigint, templateCode: string): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.GUILD_TEMPLATE(guildId, templateCode),
  );
}
