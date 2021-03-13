import { RequestManager } from "../../rest/request_manager.ts";
import { UserPayload } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";

/** This function will return the raw user payload in the rare cases you need to fetch a user directly from the API. */
export async function getUser(userID: string) {
  const result = await RequestManager.get(endpoints.USER(userID));

  return result as UserPayload;
}
