import type { Bot } from "../../bot.ts";

/**
 * Edits the nickname of the bot user.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to edit the nickname of the bot user in.
 * @param options - The parameters for the edit of the nickname.
 *
 * @remarks
 * Fires a _Guild Member Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#modify-current-member}
 */
export async function editBotMember(
  bot: Bot,
  guildId: bigint,
  options: { nick: string | null; reason?: string },
): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "PATCH",
    bot.constants.routes.USER_NICK(guildId),
    options,
  );
}
