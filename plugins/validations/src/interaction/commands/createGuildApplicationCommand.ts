import {
  ApplicationCommandTypes,
  Bot,
  CONTEXT_MENU_COMMANDS_NAME_REGEX,
  SLASH_COMMANDS_NAME_REGEX,
} from "../../../deps.ts";
import { validateApplicationCommandOptions } from "../../applicationCommandOptions.ts";

export function createGuildApplicationCommand(bot: Bot) {
  const createGuildApplicationCommand = bot.helpers.createGuildApplicationCommand;

  bot.helpers.createGuildApplicationCommand = async function (options, guildId) {
    const isChatInput = !options.type || options.type === ApplicationCommandTypes.ChatInput;

    if (!options.name) throw new Error("A name is required to create a options.");

    if (isChatInput) {
      if (!SLASH_COMMANDS_NAME_REGEX.test(options.name)) {
        throw new Error("The name of the slash command did not match the required regex.");
      }

      // Only slash need to be lowercase
      options.name = options.name.toLowerCase();

      // Slash commands require description
      if (!options.description) throw new Error("Slash commands require some form of a description be provided.");
      else if (!bot.utils.validateLength(options.description, { min: 1, max: 100 })) {
        throw new Error("Application command descriptions must be between 1 and 100 characters.");
      }

      if (options.options?.length) {
        if (options.options.length > 25) throw new Error("Only 25 options are allowed to be provided.");

        options.options = validateApplicationCommandOptions(bot, options.options);
      }
    } else {
      if (!CONTEXT_MENU_COMMANDS_NAME_REGEX.test(options.name)) {
        throw new Error("The name of the context menu did not match the required regex.");
      }
    }

    return await createGuildApplicationCommand(options, guildId);
  };
}
