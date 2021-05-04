import { rest } from "../../rest/rest.ts";
import type { Invite } from "../../types/invites/invite.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns an invite for the given code or throws an error if the invite doesn't exists. */
export async function getInvite(inviteCode: string) {
  return await rest.runMethod<Invite>(
    "get",
    endpoints.INVITE(inviteCode),
  );
}
