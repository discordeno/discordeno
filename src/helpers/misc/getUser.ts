import type { User } from "../../types/users/user.ts";
import type { Bot } from "../../bot.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

/** This function will return the raw user payload in the rare cases you need to fetch a user directly from the API. */
export async function getUser(bot: Bot, userId: bigint) {
  return await bot.rest.runMethod<User>(bot.rest, "get", bot.constants.endpoints.USER(userId));
}
