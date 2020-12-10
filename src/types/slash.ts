import { AllowedMentions } from "./channel.ts";
import { UserPayload } from "./guild.ts";
import { Embed } from "./message.ts";

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

export interface Interaction {
  /** The id of the interaction */
  id: string;
  /** The type of interaction */
  type: InteractionType;
  /** The command data payload */
  data?: SlashCommandInteractionData;
  /** The id of the guild it was sent from */
  guild_id: string;
  /** The id of the channel it was sent from */
  channel_id: string;
  /** The Payload of the member it was sent from */
  member: UserPayload;
  /** The token for this interaction */
  token: string;
}

export interface SlashCommandInteractionData {
  /** The id of the command */
  id: string;
  /** The name of the command */
  name: string;
  /** the params and values from the user */
  options: SlashCommandInteractionDataOption[];
}

export interface SlashCommandInteractionDataOption {
  /** The name of the parammeter */
  name: string;
  /** The value of the pair */
  value?: any;
  /** Present if this option is a group or subcommand */
  options?: SlashCommandInteractionDataOption[];
}

export interface InteractionResponse {
  /** The type of response */
  type: InteractionResponseType;
  /** The optional response message */
  data?: SlashCommandCallbackData;
}

export interface SlashCommandCallbackData {
  /** is the response TTS  */
  tts?: boolean;
  /** message content */
  content: string;
  /** supports up to 10 embeds */
  embeds?: Embed[];
  /** allowed mentions for the message */
  mentions?: AllowedMentions;
  /** acceptable values are message flags */
  flags: number;
}

export enum InteractionType {
  PING = 1,
  APPLICATION_COMMAND = 2,
}

export enum InteractionResponseType {
  PONG = 1,
  ACKNOWLEDGE = 2,
  CHANNEL_MESSAGE = 3,
  CHANNEL_MESSAGE_WITH_SOURCE = 4,
  ACK_WITH_SOURCE = 5,
}

export interface EditSlashCommandOptions {
  id: string;
  guildID?: string;
}

export interface UpsertSlashCommandOptions {
  id: string;
  guildID?: string;
}
