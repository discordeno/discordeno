import { Bot } from "../bot.ts";
import { ChannelTypes } from "../types/channels/channelTypes.ts";
import { ApplicationCommandOption } from "../types/interactions/commands/applicationCommandOption.ts";
import { ApplicationCommandOptionChoice } from "../types/interactions/commands/applicationCommandOptionChoice.ts";
import { ApplicationCommandOptionTypes } from "../types/interactions/commands/applicationCommandOptionTypes.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";

export function transformApplicationCommandOption(
  bot: Bot,
  payload: SnakeCasedPropertiesDeep<ApplicationCommandOption>,
): DiscordenoApplicationCommandOption {
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

export interface DiscordenoApplicationCommandOption {
  /** Value of Application Command Option Type */
  type: ApplicationCommandOptionTypes;
  /** 1-32 character name matching lowercase `^[\w-]{1,32}$` */
  name: string;
  /** 1-100 character description */
  description: string;
  /** If the parameter is required or optional--default `false` */
  required?: boolean;
  /** Choices for `string` and `int` types for the user to pick from */
  choices?: ApplicationCommandOptionChoice[];
  /** If the option is a subcommand or subcommand group type, this nested options will be the parameters */
  options?: ApplicationCommandOption[];
  /** Whether this option should make autocomplete interactions. */
  autocomplete?: boolean;
  /** If the option is a channel type, the channels shown will be restricted to these types */
  channelTypes?: ChannelTypes[];
  /** Minimum number desired. */
  minValue?: number;
  /** Maximum number desired. */
  maxValue?: number;
}
