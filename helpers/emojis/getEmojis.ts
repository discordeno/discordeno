import type { Bot } from "../../bot.ts";
import { Emoji } from "../../transformers/emoji.ts";
import { DiscordEmoji } from "../../types/discord.ts";
import { Collection } from "../../util/collection.ts";

/**
 * Returns a list of emojis for the given guild.
 */
export async function getEmojis(bot: Bot, guildId: bigint): Promise<Collection<bigint, Emoji>> {
  const results = await bot.rest.runMethod<DiscordEmoji[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_EMOJIS(guildId),
  );

  return new Collection(
    results.map((result) => {
      const emoji = bot.transformers.emoji(bot, result);
      return [emoji.id!, emoji];
    }),
  );
}
