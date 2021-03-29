import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Edit the nickname of the bot in this guild */
export async function editBotNickname(
  guildId: string,
  nickname: string | null,
) {
  await requireBotGuildPermissions(guildId, ["CHANGE_NICKNAME"]);

  const response = await RequestManager.patch(
    endpoints.USER_NICK(guildId),
    { nick: nickname },
  ) as { nick: string };

  return response.nick;
}
