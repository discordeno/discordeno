import { Bot } from "../../bot.ts";
import { Sticker } from "../../transformers/sticker.ts";

/**
 * Delete a new sticker for the guild.
 *
 * @param bot The bot instance to use to make the request.
 * @param guildId The ID of the guild to get
 * @return A {@link Sticker}
 *
 * @remarks
 * Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
 * Fires a Guild Stickers Update Gateway event.
 * Every guilds has five free sticker slots by default, and each Boost level will grant access to more slots.
 * Lottie stickers can only be uploaded on guilds that have either the `VERIFIED` and/or the `PARTNERED` guild feature.
 *
 * @see {@link https://discord.com/developers/docs/resources/sticker#delete-guild-sticker}
 */
export async function deleteGuildSticker(bot: Bot, guildId: bigint, stickerId: bigint, reason?: string): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.GUILD_STICKER(guildId, stickerId),
    reason ? { reason } : undefined,
  );
}
