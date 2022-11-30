import type { Bot } from "../../bot.ts";
import { User } from "../../transformers/member.ts";
import { DiscordUser } from "../../types/discord.ts";
import { BigString } from "../../types/shared.ts";

/** This function will return the raw user payload in the rare cases you need to fetch a user directly from the API. */
export async function getUser(bot: Bot, userId: BigString): Promise<User> {
  const result = await bot.rest.runMethod<DiscordUser>(bot.rest, "GET", bot.constants.routes.USER(userId));

  return bot.transformers.user(bot, result);
}
