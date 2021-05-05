import { rest } from "../../rest/rest.ts";
import type { User } from "../../types/users/user.ts";
import { endpoints } from "../../util/constants.ts";

/** This function will return the raw user payload in the rare cases you need to fetch a user directly from the API. */
export async function getUser(userId: bigint) {
  return await rest.runMethod<User>("get", endpoints.USER(userId));
}
