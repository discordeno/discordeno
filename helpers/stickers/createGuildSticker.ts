import { Bot } from "../../bot.ts";
import { Sticker } from "../../transformers/sticker.ts";
import { FileContent, WithReason } from "../../types/discordeno.ts";

/**
 * Create a new sticker for the guild.
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
 * @see {@link https://discord.com/developers/docs/resources/sticker#create-guild-sticker}
 */
export async function createGuildSticker(
  bot: Bot,
  guildId: bigint,
  options: CreateGuildStickerOptions,
): Promise<Sticker> {
  const result = await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.GUILD_STICKERS(guildId), {
    name: options.name,
    description: options.description,
    tags: options.tags,
    file: options.file,
    reason: options.reason,
  });
  return bot.transformers.sticker(bot, result);
}

export interface CreateGuildStickerOptions extends WithReason {
  /** Name of the sticker (2-30 characters) */
  name: string;
  /** Description of the sticker (empty or 2-100 characters) */
  description: string;
  /** Autocomplete/suggestion tags for the sticker (max 200 characters) */
  tags: string;
  /** The sticker file to upload, must be a PNG, APNG, or Lottie JSON file, max 500 KB */
  file: FileContent;
}
