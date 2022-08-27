import type { Bot } from "../../bot.ts";

/** Edit the nickname of the bot in this guild */
export async function editBotNickname(
  bot: Bot,
  guildId: bigint,
  options: { nick: string | null; reason?: string },
): Promise<string | undefined> {
  const result = await bot.rest.runMethod<{ nick?: string }>(
    bot.rest,
    "PATCH",
    bot.constants.routes.USER_NICK(guildId),
    options,
  );

  if (!result?.nick) return;

  return result.nick;
}
