import { GetInvite } from "../../types/invites/get_invite.ts";
import type { InviteMetadata } from "../../types/invites/invite_metadata.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";
import type { Bot } from "../../bot.ts";

/** Returns an invite for the given code or throws an error if the invite doesn't exists. */
export async function getInvite(bot: Bot, inviteCode: string, options?: GetInvite) {
  return await bot.rest.runMethod<InviteMetadata>(bot.rest,
    "get",
    bot.constants.endpoints.INVITE(inviteCode),
    {
      with_counts: options?.withCounts,
      with_expiration: options?.withExpiration,
    }
  );
}
