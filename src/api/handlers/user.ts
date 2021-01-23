import { RequestManager } from "../../rest/request_manager.ts";
import { CreateGuildPayload, UserPayload } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";

/**
 * Returns the user object of the requester's account.
 * For OAuth2, this requires the `identify` scope, which will return the object without an email,
 * and optionally the email scope, which returns the object with an email.
 */
export function getCurrentUser() {
  return RequestManager.get(endpoints.USER_BOT) as Promise<
    UserPayload
  >;
}

/**
 * Returns a list of partial guild objects the current user is a member of. 
 * Requires the `guilds` OAuth2 scope.
 * 
 * ⚠️ **If you need this, you are probably doing something wrong. Always use cache.guilds
 *
 * Advanced Devs:
 * This function gets you a list of all guilds in those your bot is in.
 */
export function getCurrentUserGuilds() {
  return RequestManager.get(endpoints.USER_GUILDS) as Promise<
    Partial<CreateGuildPayload>
  >;
}
