import type {Bot} from "../../bot.ts";

/** Edit the nickname of the bot in this guild */
export async function editBotNickname(bot: Bot, guildId: bigint, nickname: string | null) {
  await bot.utils.requireBotGuildPermissions(bot,guildId, ["CHANGE_NICKNAME"]);

  const response = await bot.rest.runMethod<{ nick: string }>(bot.rest,"patch", bot.constants.endpoints.USER_NICK(guildId), {
    nick: nickname,
  });

  return response.nick;
}
