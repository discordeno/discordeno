import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Modify the given emoji. Requires the MANAGE_EMOJIS permission. */
export async function editEmoji(
  guildID: string,
  id: string,
  options: EditEmojisOptions,
) {
  await requireBotGuildPermissions(guildID, ["MANAGE_EMOJIS"]);

  const result = await RequestManager.patch(
    endpoints.GUILD_EMOJI(guildID, id),
    {
      name: options.name,
      roles: options.roles,
    },
  );

  return result;
}
