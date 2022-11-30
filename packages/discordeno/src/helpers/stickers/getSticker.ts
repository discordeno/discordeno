import { Bot } from "../../bot.ts";
import { Sticker } from "../../mod.ts";
import { DiscordSticker } from "../../types/discord.ts";

/**
 * Returns a sticker object for the given sticker ID.
 *
 * @param bot The bot instance to use to make the request.
 * @param stickerId The ID of the sticker to get
 * @returns A {@link Sticker}
 *
 * @see {@link https://discord.com/developers/docs/resources/sticker#get-sticker}
 */
export async function getSticker(bot: Bot, stickerId: bigint): Promise<Sticker> {
  const result = await bot.rest.runMethod<DiscordSticker>(bot.rest, "GET", bot.constants.routes.STICKER(stickerId));

  return bot.transformers.sticker(bot, result);
}
