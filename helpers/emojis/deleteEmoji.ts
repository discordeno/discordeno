import type { Bot } from "../../bot.ts";
import { BigString } from "../../types/shared.ts";

/**
 * Deletes an emoji from a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild from which to delete the emoji.
 * @param id - The ID of the emoji to delete.
 *
 * @remarks
 * Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * Fires a _Guild Emojis Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/emoji#delete-guild-emoji}
 */
export async function deleteEmoji(bot: Bot, guildId: BigString, id: BigString, reason?: string): Promise<void> {
  return await bot.rest.runMethod<void>(bot.rest, "DELETE", bot.constants.routes.GUILD_EMOJI(guildId, id), {
    reason,
  });
}
