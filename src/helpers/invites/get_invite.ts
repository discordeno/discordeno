import { rest } from "../../rest/rest.ts";
import { GetInvite } from "../../types/invites/get_invite.ts";
import type { Invite } from "../../types/invites/invite.ts";
import { endpoints } from "../../util/constants.ts";
import { camelKeysToSnakeCase } from "../../util/utils.ts";

/** Returns an invite for the given code or throws an error if the invite doesn't exists. */
export async function getInvite(inviteCode: string, options?: GetInvite) {
  return await rest.runMethod<Invite>(
    "get",
    endpoints.INVITE(inviteCode),
    camelKeysToSnakeCase(options ?? {}),
  );
}
