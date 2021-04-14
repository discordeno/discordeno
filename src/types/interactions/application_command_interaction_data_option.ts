import { SnakeCasedPropertiesDeep } from "../util.ts";
import { DiscordApplicationCommandOptionTypes } from "./application_command_option_types.ts";

export interface ApplicationCommandInteractionDataOption {
  /** The name of the parameter */
  name: string;
  /** value of DiscordApplicationCommandOptionTypes */
  type: DiscordApplicationCommandOptionTypes;
  /** The value of the pair */
  value?: DiscordApplicationCommandOptionTypes;
  /** Present if this option is a group or subcommand */
  options?: ApplicationCommandInteractionDataOption[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondataoption */
export type DiscordApplicationCommandInteractionDataOption =
  SnakeCasedPropertiesDeep<ApplicationCommandInteractionDataOption>;
