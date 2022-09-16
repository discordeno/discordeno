import type { Bot } from "../../bot.ts";
import { BigString, WithReason } from "../../mod.ts";
import { Emoji } from "../../transformers/emoji.ts";
import { DiscordEmoji } from "../../types/discord.ts";

/**
 * Edits an emoji.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild in which to edit the emoji.
 * @param id - The ID of the emoji to edit.
 * @param options - The parameters for the edit of the emoji.
 * @returns An instance of the updated {@link Emoji}.
 *
 * @remarks
 * Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * Fires a `Guild Emojis Update` gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/emoji#modify-guild-emoji}
 */
export async function editEmoji(
  bot: Bot,
  guildId: BigString,
  id: BigString,
  options: ModifyGuildEmoji,
): Promise<Emoji> {
  const result = await bot.rest.runMethod<DiscordEmoji>(
    bot.rest,
    "PATCH",
    bot.constants.routes.GUILD_EMOJI(guildId, id),
    {
      name: options.name,
      // NEED TERNARY TO SUPPORT NULL AS VALID
      roles: options.roles ? options.roles.map((role) => role.toString()) : options.roles,
      reason: options.reason,
    },
  );

  return bot.transformers.emoji(bot, result);
}

/** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
export interface ModifyGuildEmoji extends WithReason {
  /** Name of the emoji */
  name?: string;
  /** Roles allowed to use this emoji */
  roles?: BigString[] | null;
}
