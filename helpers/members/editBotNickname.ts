import type { Bot } from "../../bot.ts";

/**
 * Edits the nickname of the bot user.
 *
 * @deprecated Use `editMember()` instead.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to edit the nickname of the bot user in.
 * @param options - The parameters for the edit of the nickname.
 * @returns The edited nickname, or `undefined` if the nickname does not exist.
 *
 * @remarks
 * Fires a _Guild Member Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#modify-current-user-nick}
 */
export async function editBotNickname(
  bot: Bot,
  guildId: bigint,
  options: { nick: string | null; reason?: string },
): Promise<string | undefined> {
  const result = await bot.rest.runMethod<{ nick: string | null }>(
    bot.rest,
    "PATCH",
    bot.constants.routes.USER_NICK(guildId),
    options,
  );

  return result.nick ?? undefined;
}
