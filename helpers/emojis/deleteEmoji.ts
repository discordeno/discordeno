import type { Bot } from "../../bot.ts";

/** Delete the given emoji. Requires the MANAGE_EMOJIS permission. Returns 204 No Content on success. */
export async function deleteEmoji(bot: Bot, guildId: bigint, id: bigint, reason?: string): Promise<void> {
  return await bot.rest.runMethod<void>(bot.rest, "DELETE", bot.constants.routes.GUILD_EMOJI(guildId, id), {
    reason,
  });
}
