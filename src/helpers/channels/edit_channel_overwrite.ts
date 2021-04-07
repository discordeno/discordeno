import { rest } from "../../rest/rest.ts";
import { Overwrite } from "../../types/channels/overwrite.ts";
import { endpoints } from "../../util/constants.ts";
import {
  calculateBits,
  requireBotGuildPermissions,
} from "../../util/permissions.ts";

/** Edit the channel permission overwrites for a user or role in this channel. Requires `MANAGE_ROLES` permission. */
export async function editChannelOverwrite(
  guildId: string,
  channelId: string,
  overwriteId: string,
  options: Omit<Overwrite, "id">,
): Promise<undefined> {
  await requireBotGuildPermissions(guildId, ["MANAGE_ROLES"]);

  const result = await rest.runMethod(
    "put",
    endpoints.CHANNEL_OVERWRITE(channelId, overwriteId),
    {
      allow: calculateBits(options.allow),
      deny: calculateBits(options.deny),
      type: options.type,
    },
  );

  return result;
}
