import { BotWithCache } from "../../deps.ts";

export default function createGuild(bot: BotWithCache) {
  const createGuildOld = bot.helpers.createGuild;

  bot.helpers.createGuild = function (options) {
    if (bot.guilds.size > 10) {
      throw new Error(
        "A bot can not create a guild if it is already in 10 guilds.",
      );
    }

    return createGuildOld(options);
  };
}
