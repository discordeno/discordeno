import { cacheHandlers } from "../../cache.ts";
import { rest } from "../../rest/rest.ts";
import type { Invite } from "../../types/invites/invite.ts";
import { Errors } from "../../types/misc/errors.ts";
import { endpoints } from "../../util/constants.ts";
import {
  botHasChannelPermissions,
  requireBotGuildPermissions,
} from "../../util/permissions.ts";

/** Deletes an invite for the given code. Requires `MANAGE_CHANNELS` or `MANAGE_GUILD` permission */
export async function deleteInvite(channelId: bigint, inviteCode: string) {
  const channel = await cacheHandlers.get("channels", channelId);

  if (!channel) throw new Error(Errors.CHANNEL_NOT_FOUND);

  const hasPerm = await botHasChannelPermissions(channel, [
    "MANAGE_CHANNELS",
  ]);

  if (!hasPerm) {
    await requireBotGuildPermissions(channel!.guildId, ["MANAGE_GUILD"]);
  }

  return await rest.runMethod<Invite>(
    "delete",
    endpoints.INVITE(inviteCode),
  );
}
