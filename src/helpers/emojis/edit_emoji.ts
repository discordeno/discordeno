import type { Emoji } from "../../types/emojis/emoji.ts";
import type { ModifyGuildEmoji } from "../../types/emojis/modify_guild_emoji.ts";
import type { Bot } from "../../bot.ts";

/** Modify the given emoji. Requires the MANAGE_EMOJIS permission. */
export async function editEmoji(bot: Bot, guildId: bigint, id: bigint, options: ModifyGuildEmoji) {
  await bot.utils.requireBotGuildPermissions(bot, guildId, ["MANAGE_EMOJIS"]);

  return await bot.rest.runMethod<Emoji>(bot.rest, "patch", bot.constants.endpoints.GUILD_EMOJI(guildId, id), options);
}
