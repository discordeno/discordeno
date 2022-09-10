import { ApplicationCommandOption, ApplicationCommandOptionTypes, Bot } from "../deps.ts";

export function validateApplicationCommandOptions(bot: Bot, options: ApplicationCommandOption[]) {
  const requiredOptions: ApplicationCommandOption[] = [];
  const optionalOptions: ApplicationCommandOption[] = [];

  for (const option of options) {
    option.name = option.name.toLowerCase();

    if (option.choices?.length) {
      if (option.choices.length > 25) throw new Error("Too many application command options provided.");

      if (
        option.type !== ApplicationCommandOptionTypes.String && option.type !== ApplicationCommandOptionTypes.Integer
      ) {
        throw new Error("Only string or integer options can have choices.");
      }
    }

    if (!bot.utils.validateLength(option.name, { min: 1, max: 32 })) {
      throw new Error("Invalid application command option name.");
    }

    if (!bot.utils.validateLength(option.description, { min: 1, max: 100 })) {
      throw new Error("Invalid application command description.");
    }

    option.choices?.every((choice) => {
      if (!bot.utils.validateLength(choice.name, { min: 1, max: 100 })) {
        throw new Error("Invalid application command option choice name. Must be between 1-100 characters long.");
      }

      if (
        option.type === ApplicationCommandOptionTypes.String &&
        (typeof choice.value !== "string" || choice.value.length < 1 || choice.value.length > 100)
      ) {
        throw new Error("Invalid slash options choice value type.");
      }

      if (option.type === ApplicationCommandOptionTypes.Integer && typeof choice.value !== "number") {
        throw new Error("A number must be set for Integer types.");
      }
    });

    if (option.required) {
      requiredOptions.push(option);
      continue;
    }

    optionalOptions.push(option);
  }

  return [...requiredOptions, ...optionalOptions];
}
