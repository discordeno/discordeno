import { Bot } from "../../bot.ts";
import { StickerPack } from "../../transformers/sticker.ts";
import { DiscordStickerPack } from "../../types/discord.ts";

/** Returns the list of sticker packs available to Nitro subscribers. */
export async function getNitroStickerPacks(bot: Bot): Promise<StickerPack[]> {
  const packs = await bot.rest.runMethod<DiscordStickerPack[]>(
    bot.rest,
    "GET",
    bot.constants.routes.NITRO_STICKER_PACKS(),
  );

  return packs.map((pack) => bot.transformers.stickerPack(bot, pack));
}
