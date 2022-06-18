import { Bot } from "../../bot.ts";

/** Edit the nickname of the bot in this guild */
export async function editBotNickname(bot: Bot, guildId: bigint, options: { nick: string | null; reason?: string }) {
  const response = await bot.rest.runMethod<{ nick: string }>(
    bot.rest,
    "PATCH",
    bot.constants.routes.USER_NICK(guildId),
    options,
  );

  if (!response?.nick) return;

  return response.nick;
}
