import { rest } from "../../rest/rest.ts";
import { DiscordInvite, Invite } from "../../types/invites/invite.ts";
import { endpoints } from "../../util/constants.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/** Returns an invite for the given code or throws an error if the invite doesn't exists. */
export async function getInvite(inviteCode: string) {
  const result: DiscordInvite = await rest.runMethod(
    "get",
    endpoints.INVITE(inviteCode),
  );

  return snakeKeysToCamelCase<Invite>(result);
}
