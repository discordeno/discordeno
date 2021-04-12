import { rest } from "../../rest/rest.ts";
import { InviteCreate } from "../../types/invites/invite_create.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Creates a new invite for this channel. Requires CREATE_INSTANT_INVITE */
export async function createInvite(
  channelId: string,
  options: InviteCreate,
) {
  await requireBotChannelPermissions(channelId, ["CREATE_INSTANT_INVITE"]);

  // TODO: add proper options validation

  const result = await rest.runMethod(
    "post",
    endpoints.CHANNEL_INVITES(channelId),
    options,
  );

  return result;
}
