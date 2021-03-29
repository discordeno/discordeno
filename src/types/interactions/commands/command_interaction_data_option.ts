import { CommandOptionTypes } from "./command_option_types.ts";

export interface CommandInteractionDataOption {
  /** The name of the parameter */
  name: string;
  /** The value of the pair */
  value?: CommandOptionTypes;
  /** Present if this option is a group or subcommand */
  options?: CommandInteractionDataOption[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondataoption */
export type DiscordCommandInteractionDataOption = CommandInteractionDataOption;
