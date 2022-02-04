import type { Bot } from "../../bot.ts";

/** Edit the nickname of the bot in this guild */
export async function editBotNickname(bot: Bot, guildId: bigint, options: { nick: string | null; reason?: string }) {
  const response = await bot.rest.runMethod<{ nick: string }>(
    bot.rest,
    "patch",
    bot.constants.endpoints.USER_NICK(guildId),
    options,
  );

  return response.nick;
}
