import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns the bot's OAuth2 application object without `flags`. */
export async function getApplicationInformation() {
  const result = await RequestManager.get(
    endpoints.OAUTH2_APPLICATION,
  );

  return result as OAuthApplication;
}
