import { Bot } from "../../bot.ts";
import { ApplicationCommandOption } from "../applicationCommandOption.ts";
import { DiscordApplicationCommandOption } from "../../deps.ts";

export function transformApplicationCommandOptionToDiscordApplicationCommandOption(
  bot: Bot,
  payload: ApplicationCommandOption,
): DiscordApplicationCommandOption {
  return {
    type: payload.type,
    name: payload.name,
    name_localizations: payload.nameLocalizations,
    description: payload.description,
    description_localizations: payload.descriptionLocalizations,
    required: payload.required,
    choices: payload.choices?.map((choice) => bot.transformers.reverse.applicationCommandOptionChoice(bot, choice)),
    autocomplete: payload.autocomplete,
    channel_types: payload.channelTypes,
    min_value: payload.minValue,
    max_value: payload.maxValue,

    options: payload.options?.map((option) => bot.transformers.reverse.applicationCommandOption(bot, option)),
  };
}
