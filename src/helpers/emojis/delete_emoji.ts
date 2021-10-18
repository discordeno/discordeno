import type { Bot } from "../../bot.ts";

/** Delete the given emoji. Requires the MANAGE_EMOJIS permission. Returns 204 No Content on success. */
export async function deleteEmoji(bot: Bot, guildId: bigint, id: bigint, reason?: string) {
  await bot.utils.requireBotGuildPermissions(guildId, ["MANAGE_EMOJIS"]);

  return await bot.rest.runMethod<undefined>(bot.rest, "delete", bot.constants.endpoints.GUILD_EMOJI(guildId, id), {
    reason,
  });
}
