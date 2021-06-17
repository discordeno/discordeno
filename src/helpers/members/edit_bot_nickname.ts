import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/**
 * Edit the nickname of the bot in this guild
 * @deprecated Deprecated in favor of editBotMember(guildId, [options]); use editBotMember() instead.
 */
export async function editBotNickname(guildId: bigint, nickname: string | null) {
  await requireBotGuildPermissions(guildId, ["CHANGE_NICKNAME"]);

  const response = await rest.runMethod<{ nick: string }>("patch", endpoints.USER_NICK(guildId), {
    nick: nickname,
  });

  return response.nick;
}
