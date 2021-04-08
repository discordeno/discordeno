import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Delete the channel permission overwrites for a user or role in this channel. Requires `MANAGE_ROLES` permission. */
export async function deleteChannelOverwrite(
  guildId: string,
  channelId: string,
  overwriteId: string,
): Promise<undefined> {
  await requireBotGuildPermissions(guildId, ["MANAGE_ROLES"]);

  const result = await rest.runMethod(
    "delete",
    endpoints.CHANNEL_OVERWRITE(channelId, overwriteId),
  );

  return result;
}
