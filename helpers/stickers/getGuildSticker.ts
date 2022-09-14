import { Bot, Sticker } from "../../mod.ts";

/**
 * Returns a sticker object for the given guild and sticker IDs.
 *
 * @param bot The bot instance to use to make the request.
 * @param guildId The ID of the guild to get
 * @param stickerId The ID of the sticker to get
 * @return A {@link Sticker}
 *
 * @remarks Includes the user field if the bot has the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/sticker#get-guild-sticker}
 */
export async function getGuildSticker(bot: Bot, guildId: bigint, stickerId: bigint): Promise<Sticker> {
  const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_STICKER(guildId, stickerId));
  return bot.transformers.sticker(bot, result);
}
