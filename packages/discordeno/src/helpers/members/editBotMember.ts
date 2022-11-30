import type { Bot } from "../../bot.ts";
import { BigString, DiscordMember, Member, WithReason } from "../../mod.ts";

/**
 * Edits the nickname of the bot user.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to edit the nickname of the bot user in.
 * @param options - The parameters for the edit of the nickname.
 * @returns An instance of the edited {@link Member}
 *
 * @remarks
 * Fires a _Guild Member Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#modify-current-member}
 */
export async function editBotMember(
  bot: Bot,
  guildId: BigString,
  options: EditBotMemberOptions,
): Promise<Member> {
  const result = await bot.rest.runMethod<DiscordMember>(
    bot.rest,
    "PATCH",
    bot.constants.routes.USER_NICK(guildId),
    {
      nick: options.nick,
      reason: options.reason,
    },
  );

  return bot.transformers.member(bot, result, bot.transformers.snowflake(guildId), bot.id);
}

export interface EditBotMemberOptions extends WithReason {
  nick?: string | null;
}
