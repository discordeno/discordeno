import type { Bot } from "../../bot.ts";
import { DiscordConnection } from "../../types/discord.ts";

export async function getUserConnections(bot: Bot) {
  const result = await bot.rest.runMethod<DiscordConnection>(
    bot.rest,
    "get",
    bot.constants.endpoints.USER_CONNECTIONS(),
  );

  return bot.transformers.connection(bot, result);
}
