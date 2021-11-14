import type { Emoji } from "../../types/emojis/emoji.ts";
import type { ModifyGuildEmoji } from "../../types/emojis/modifyGuildEmoji.ts";
import type { Bot } from "../../bot.ts";

/** Modify the given emoji. Requires the MANAGE_EMOJIS permission. */
export async function editEmoji(bot: Bot, guildId: bigint, id: bigint, options: ModifyGuildEmoji) {
  return await bot.rest.runMethod<Emoji>(bot.rest, "patch", bot.constants.endpoints.GUILD_EMOJI(guildId, id), options);
}
