import { Bot } from "../../../../bot.ts";

export function createGuildSticker(bot: Bot) {
  const createGuildSticker = bot.helpers.createGuildSticker;
  bot.helpers.createGuildSticker = (guildId, options) => {
    if (!bot.utils.validateLength(options.name, { min: 2, max: 30 })) {
      throw new Error("Sticker name length must be between 2 and 30 characters");
    }
    // description of the sticker (empty or 2-100 characters)
    if (options.description !== "" && !bot.utils.validateLength(options.description, { min: 2, max: 100 })) {
      throw new Error(
        "Sticker description must be empty or sticker description length must be between 2 and 100 characters",
      );
    }
    if (!bot.utils.validateLength(options.tags, { max: 200 })) {
      throw new Error("Sticker tags length must be less than 200 characters");
    }
    return createGuildSticker(guildId, options);
  };
}
