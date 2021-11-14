import type { InviteMetadata } from "../../types/invites/inviteMetadata.ts";
import type { Bot } from "../../bot.ts";

/** Deletes an invite for the given code. Requires `MANAGE_CHANNELS` or `MANAGE_GUILD` permission */
export async function deleteInvite(bot: Bot, inviteCode: string) {
  return await bot.rest.runMethod<InviteMetadata>(bot.rest, "delete", bot.constants.endpoints.INVITE(inviteCode));
}
