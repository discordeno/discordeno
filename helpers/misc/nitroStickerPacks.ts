import { Bot } from "../../bot.ts";
import { DiscordStickerPack } from "../../types/discord.ts";

/** Returns the list of sticker packs available to Nitro subscribers. */
export async function nitroStickerPacks(bot: Bot) {
  const packs = await bot.rest.runMethod<DiscordStickerPack[]>(
    bot.rest,
    "get",
    bot.constants.endpoints.NITRO_STICKER_PACKS,
  );

  return packs.map((pack) => bot.transformers.stickerPack(bot, pack));
}
