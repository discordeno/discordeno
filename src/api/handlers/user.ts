import { RequestManager } from "../../rest/request_manager.ts";
import { UserPayload } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";

/**
 * Returns the user object of the requester's account.
 * For OAuth2, this requires the `identify` scope, which will return the object without an email,
 * and optionally the email scope, which returns the object with an email.
 */
export async function getCurrentUser() {
  const result = await RequestManager.get(endpoints.USER_BOT) as UserPayload;
  return result;
}
