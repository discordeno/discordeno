import { UserPayload } from "../../mod.ts";
import { Embed } from "./message.ts";

export interface SlashCommand {
  /** The id of the command */
  id: string;
  /** The id of the parent application */
  application_id: string;
  /** The command name (3-32 characters) */
  name: string;
  /** The command description (1-100 characters) */
  description: string;
  /** The parameters for the command */
  options: SlashCommandOption[];
}

export interface SlashCommandOption {
  /** The type of the command option */
  type: SlashCommandOptionType;
  /** The name of the option (1-32 characters) */
  name: string;
  /** The description of the option (1-100 characters) */
  description: string;
  /** Wether this is the default option **Only one can be default** */
  default?: boolean;
  /** Wehter this parameter is required (default false) */
  required?: boolean;
  /** Choices the user can pick */
  choices?: SlashCommandOptionChoice[];
  /** Options for this command */
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
  /** If the response is TTS */
  tts?: boolean;
  /** Message content */
  content: string;
  /** Embeds (up to 10) */
  embeds?: Embed[];
  /** Allowed mentions */
  allowed_mentions?: "rolles" | "users" | "everyone";
  /** Message flags */
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
