import type { Emoji } from "../../types/emojis/emoji.ts";
import { Errors } from "../../types/discordeno/errors.ts";
import type { Bot } from "../../bot.ts";

/**
 * Returns an emoji for the given guild and emoji Id.
 */
export async function getEmoji(bot: Bot, guildId: bigint, emojiId: bigint) {
  return await bot.rest.runMethod<Emoji>(bot.rest, "get", bot.constants.endpoints.GUILD_EMOJI(guildId, emojiId));
}
