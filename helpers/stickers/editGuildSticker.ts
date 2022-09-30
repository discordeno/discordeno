import { Bot } from "../../bot.ts";
import { Sticker } from "../../transformers/sticker.ts";
import { WithReason } from "../../types/discordeno.ts";
import { AtLeastOne } from "../../types/shared.ts";

/**
 * Edit the given sticker.
 *
 * @param bot The bot instance to use to make the request.
 * @param guildId The ID of the guild to get
 * @return A {@link Sticker}
 *
 * @remarks
 * Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
 * Fires a Guild Stickers Update Gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/sticker#modify-guild-sticker}
 */
export async function editGuildSticker(
  bot: Bot,
  guildId: bigint,
  stickerId: bigint,
  options: AtLeastOne<EditGuildStickerOptions>,
): Promise<Sticker> {
  const result = await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.GUILD_STICKER(guildId, stickerId), {
    name: options.name,
    description: options.description,
    tags: options.tags,
    reason: options.reason,
  });
  return bot.transformers.sticker(bot, result);
}

export interface EditGuildStickerOptions extends WithReason {
  /** Name of the sticker (2-30 characters) */
  name?: string;
  /** Description of the sticker (empty or 2-100 characters) */
  description?: string | null;
  /** Autocomplete/suggestion tags for the sticker (max 200 characters) */
  tags?: string;
}
