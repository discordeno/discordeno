import { rest } from "../../rest/rest.ts";
import type { Invite } from "../../types/invites/invite.ts";
import { Collection } from "../../util/collection.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Gets the invites for this channel. Requires MANAGE_CHANNEL */
export async function getChannelInvites(channelId: bigint) {
  await requireBotChannelPermissions(channelId, ["MANAGE_CHANNELS"]);

  const result = await rest.runMethod<Invite[]>(
    "get",
    endpoints.CHANNEL_INVITES(channelId),
  );

  return new Collection(
    result.map((invite) => [invite.code, invite]),
  );
}
