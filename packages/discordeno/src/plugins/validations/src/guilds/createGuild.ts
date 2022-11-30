import { Bot } from "../../deps.ts";

export function createGuild(bot: Bot) {
  const createGuild = bot.helpers.createGuild;

  bot.helpers.createGuild = function (options) {
    if (
      options.name &&
      !bot.utils.validateLength(options.name, { min: 2, max: 100 })
    ) {
      throw new Error("The guild name must be between 2 and 100 characters.");
    }

    return createGuild(options);
  };
}
