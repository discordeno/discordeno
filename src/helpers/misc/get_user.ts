import { rest } from "../../rest/rest.ts";
import { DiscordUser } from "../../types/users/user.ts";
import { User } from "../../types/users/user.ts";
import { endpoints } from "../../util/constants.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/** This function will return the raw user payload in the rare cases you need to fetch a user directly from the API. */
export async function getUser(userId: string) {
  const result: User = await rest.runMethod("get", endpoints.USER(userId));

  return snakeKeysToCamelCase<DiscordUser>(result);
}
