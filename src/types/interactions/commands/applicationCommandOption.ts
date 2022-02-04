import { ChannelTypes } from "../../channels/channelTypes.ts";
import { ApplicationCommandOptionChoice } from "./applicationCommandOptionChoice.ts";
import { ApplicationCommandOptionTypes } from "./applicationCommandOptionTypes.ts";

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption */
export interface ApplicationCommandOption {
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
  /** if autocomplete interactions are enabled for this `String`, `Integer`, or `Number` type option */
  autocomplete?: boolean;
  /** If the option is a channel type, the channels shown will be restricted to these types */
  channelTypes?: ChannelTypes[];
  /** Minimum number desired. */
  minValue?: number;
  /** Maximum number desired. */
  maxValue?: number;
}
