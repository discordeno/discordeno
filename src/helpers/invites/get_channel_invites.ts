import { rest } from "../../rest/rest.ts";
import { DiscordInvite, Invite } from "../../types/invites/invite.ts";
import { Collection } from "../../util/collection.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/** Gets the invites for this channel. Requires MANAGE_CHANNEL */
export async function getChannelInvites(channelId: string) {
  await requireBotChannelPermissions(channelId, ["MANAGE_CHANNELS"]);

  const result = (await rest.runMethod(
    "get",
    endpoints.CHANNEL_INVITES(channelId)
  )) as DiscordInvite[];

  return new Collection(
    result.map((invite) => [invite.code, snakeKeysToCamelCase<Invite>(invite)])
  );
}
