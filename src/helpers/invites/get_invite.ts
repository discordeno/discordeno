import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns an invite for the given code. */
export async function getInvite(inviteCode: string) {
  const result = await rest.runMethod("get", endpoints.INVITE(inviteCode));

  return result as InvitePayload;
}
