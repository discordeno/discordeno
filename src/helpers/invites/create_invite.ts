import { rest } from "../../rest/rest.ts";
import { CreateChannelInvite } from "../../types/invites/create_channel_invite.ts";
import { Invite } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Creates a new invite for this channel. Requires CREATE_INSTANT_INVITE */
export async function createInvite(
  channelId: string,
  options: CreateChannelInvite,
) {
  await requireBotChannelPermissions(channelId, ["CREATE_INSTANT_INVITE"]);

  // TODO: add proper options validation

  return await rest.runMethod<Invite>(
    "post",
    endpoints.CHANNEL_INVITES(channelId),
    options,
  );
}
