import { RequestManager } from "../../rest/request_manager.ts";
import { oauthApplication } from "../../types/oauth.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns the bot's OAuth2 application object without `flags`. */
export function getApplicationInformation() {
  return RequestManager.get(endpoints.OAUTH2_APPLICATION) as Promise<
    oauthApplication
  >;
}
