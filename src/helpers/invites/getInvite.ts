import { GetInvite } from "../../types/invites/getInvite.ts";
import type { InviteMetadata } from "../../types/invites/inviteMetadata.ts";
import type { Bot } from "../../bot.ts";

/** Returns an invite for the given code or throws an error if the invite doesn't exists. */
export async function getInvite(bot: Bot, inviteCode: string, options?: GetInvite) {
  return await bot.rest.runMethod<InviteMetadata>(bot.rest, "get", bot.constants.endpoints.INVITE(inviteCode), {
    with_counts: options?.withCounts || false,
    with_expiration: options?.withExpiration || false,
    guild_scheduled_event_id: options?.scheduledEventId?.toString(),
  });
}
