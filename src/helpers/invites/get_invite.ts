import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns an invite for the given code. */
export async function getInvite(inviteCode: string) {
  const result = await RequestManager.get(endpoints.INVITE(inviteCode));

  return result as InvitePayload;
}
