import { Bot } from "../bot.ts";
import { DiscordApplicationCommandOption, DiscordApplicationCommandOptionChoice } from "../types/discord.ts";
import { ApplicationCommandOptionTypes, ChannelTypes } from "../types/shared.ts";
import { Optionalize } from "../types/shared.ts";

export function transformApplicationCommandOption(
  bot: Bot,
  payload: DiscordApplicationCommandOption,
): ApplicationCommandOption {
  return {
    type: payload.type,
    name: payload.name,
    description: payload.description,
    required: payload.required ?? false,
    choices: payload.choices,
    autocomplete: payload.autocomplete,
    channelTypes: payload.channel_types,
    minValue: payload.min_value,
    maxValue: payload.max_value,

    options: payload.options?.map((option) => bot.transformers.applicationCommandOption(bot, option)),
  };
}

// THIS TRANSFORMER HAS A CIRCULAR REFERENCE TO CALL ITSELF FOR OPTIONS SO AN AUTOMATED TYPE CAN NOT BE CREATED!

export interface ApplicationCommandOption {
  /** Value of Application Command Option Type */
  type: ApplicationCommandOptionTypes;
  /** 1-32 character name matching lowercase `^[\w-]{1,32}$` */
  name: string;
  /** 1-100 character description */
  description: string;
  /** If the parameter is required or optional--default `false` */
  required: boolean;
  /** Choices for `string` and `int` types for the user to pick from */
  choices?: DiscordApplicationCommandOptionChoice[];
  /** If the option is a subcommand or subcommand group type, this nested options will be the parameters */
  options?: ApplicationCommandOption[];
  /** if autocomplete interactions are enabled for this `String`, `Integer`, or `Number` type option */
  autocomplete?: boolean;
  /** If the option is a channel type, the channels shown will be restricted to these types */
  channelTypes?: ChannelTypes[];
  /** Minimum number desired. */
  minValue?: number;
  /** Maximum number desired. */
  maxValue?: number;
}
