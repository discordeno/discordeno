import { BotWithCache } from "../../deps.ts";

export default function createGuild(bot: BotWithCache) {
  const createGuildOld = bot.helpers.createGuild;

  bot.helpers.createGuild = function (options) {
    if (bot.guilds.size > 10) {
      throw new Error(
        "A bot can not create a guild if it is already in 10 guilds.",
      );
    }

    if (
      options.name &&
      !bot.utils.validateLength(options.name, { min: 2, max: 100 })
    ) {
      throw new Error("The guild name must be between 2 and 100 characters.");
    }

    return createGuildOld(options);
  };
}
