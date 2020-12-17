import { InteractionResponseType, SlashCommandCallbackData } from "./interactions.ts";

export interface CreateSlashCommandOptions {
  /** The name of the slash command.  */
  name: string;
  /** The description of the slash command. */
  description: String;
  /** If a guildID is provided, this will be a GUILD command. If none is provided it will be a GLOBAL command. */
  guildID?: string;
  /** The options for this command */
  options?: SlashCommandOption[];
}

export interface SlashCommand {
  /** unique id of the command */
  id: string;
  /** unique id of the parent application */
  application_id: string;
  /** 3-32 character name */
  name: string;
  /** 1-100 character description */
  description: string;
  /** the parameters for the command */
  options?: SlashCommandOption[];
}

export interface SlashCommandOption {
  /** The type of option */
  type: SlashCommandOptionType;
  /** 1-32 character name */
  name: string;
  /** 1-100 character description*/
  description: string;
  /** the first `required` option for the user to complete--only one option can be `default` */
  default?: boolean;
  /** if the parameter is required or optional--default `false`*/
  required?: boolean;
  /** 
     * If you specify `choices` for an option, they are the **only** valid values for a user to pick.
     * choices for `string` and `int` types for the user to pick from 
     */
  choices?: SlashCommandOptionChoice[];
  /** if the option is a subcommand or subcommand group type, this nested options will be the parameters */
  options?: SlashCommandOption[];
}

export interface SlashCommandOptionChoice {
  /** The name of the choice */
  name: string;
  /** The value of the choice */
  value: string | number;
}

export enum SlashCommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
}

export interface EditSlashCommandOptions {
  id: string;
  guildID?: string;
}

export interface ExecuteSlashCommandOptions {
  type: InteractionResponseType;
  data: SlashCommandCallbackData;
}

export interface EditSlashResponseOptions extends SlashCommandCallbackData {
  /** If this is not provided, it will default to editing the original response. */
  messageID?: string;
}

export interface UpsertSlashCommandOptions {
  id: string;
  guildID?: string;
}
