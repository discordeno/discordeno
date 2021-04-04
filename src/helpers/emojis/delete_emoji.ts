import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Delete the given emoji. Requires the MANAGE_EMOJIS permission. Returns 204 No Content on success. */
export async function deleteEmoji(
  guildId: string,
  id: string,
  reason?: string,
) {
  await requireBotGuildPermissions(guildId, ["MANAGE_EMOJIS"]);

  const result = await rest.runMethod(
    "delete",
    endpoints.GUILD_EMOJI(guildId, id),
    { reason },
  );

  return result;
}
