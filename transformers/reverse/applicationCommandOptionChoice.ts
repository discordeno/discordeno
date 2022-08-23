import { Bot } from "../../bot.ts";
import { DiscordApplicationCommandOptionChoice } from "../../types/discord.ts";
import { ApplicationCommandOptionChoice } from "../applicationCommandOptionChoice.ts";

export function transformApplicationCommandOptionChoiceToDiscordApplicationCommandOptionChoice(
  bot: Bot,
  payload: ApplicationCommandOptionChoice,
): DiscordApplicationCommandOptionChoice {
  return {
    name: payload.name,
    name_localizations: payload.nameLocalizations,
    value: payload.value,
  };
}
