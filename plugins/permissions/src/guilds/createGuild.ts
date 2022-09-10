import { BotWithCache } from "../../deps.ts";

export function createGuild(bot: BotWithCache) {
  const createGuild = bot.helpers.createGuild;

  bot.helpers.createGuild = async function (options) {
    if (bot.guilds.size > 10) throw new Error("A bot can not create a guild if it is already in 10 guilds.");

    return await createGuild(options);
  };
}
