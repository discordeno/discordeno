import { Bot } from "../../bot.ts";
import { Collection, Sticker } from "../../mod.ts";
import { DiscordSticker } from "../../types/discord.ts";

/**
 * Returns an array of sticker objects for the given guild.
 *
 * @param bot The bot instance to use to make the request.
 * @param guildId The ID of the guild to get
 * @returns A collection of {@link Sticker} objects assorted by sticker ID.
 *
 * @remarks Includes user fields if the bot has the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/sticker#list-guild-stickers}
 */
export async function getGuildStickers(bot: Bot, guildId: bigint): Promise<Collection<bigint, Sticker>> {
  const results = await bot.rest.runMethod<DiscordSticker[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_STICKERS(guildId),
  );

  return new Collection(
    results.map((result) => {
      const pack = bot.transformers.sticker(bot, result);
      return [pack.id, pack];
    }),
  );
}
