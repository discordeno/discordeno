import {
  ApplicationCommandOptionType,
  InteractionResponseType,
  InteractionType,
} from "../../types/mod.ts";
import { AllowedMentionType, Embed } from "./channel.ts";
import { GuildMember } from "./guild.ts";

export type {
  ApplicationCommandOptionType,
  InteractionResponseType,
  InteractionType,
};
/** https://discord.com/developers/docs/interactions/slash-commands#create-global-application-command */
export interface ApplicationCommandParams {
  /** 3-32 character command name */
  name: string;
  /** 1-100 character description */
  description: string;
  /** the parameters for the command */
  options?: ApplicationCommandOption[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommand */
export interface ApplicationCommand {
  /** unique id of the command */
  id: string;
  /** unique id of the parent application */
  applicationID: string;
  /** 3-32 character name matching ^[\w-]{3,32}$ */
  name: string;
  /** 1-100 character description */
  description: string;
  /** the parameters for the command */
  options?: ApplicationCommandOption[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption */
export interface ApplicationCommandOption {
  /** value of ApplicationCommandOptionType */
  type: ApplicationCommandOptionType;
  /** 1-32 character name matching ^[\w-]{1,32}$ */
  name: string;
  /** 1-100 character description */
  description: string;
  /** the first required option for the user to complete--only one option can be default */
  default?: boolean;
  /** if the parameter is required or optional--default false */
  required?: boolean;
  /** choices for string and number types for the user to pick from */
  choices?: ApplicationCommandOptionChoice[];
  /** if the option is a subcommand or subcommand group type, this nested options will be the parameters */
  options?: ApplicationCommandOption[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptionchoice */
export interface ApplicationCommandOptionChoice {
  /** 1-100 character choice name */
  name: string;
  /** value of the choice */
  value: string | number;
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction */
export interface Interaction {
  /** id of the interaction */
  id: string;
  /** the type of interaction */
  type: InteractionType;
  /** the command data payload */
  data?: ApplicationCommandInteractionData;
  /** the guild it was sent from */
  guildID: string;
  /** the channel it was sent from */
  channelID: string;
  /** guild member data for the invoking user */
  member: GuildMember;
  /** a continuation token for responding to the interaction */
  token: string;
  /** read-only property, always 1 */
  version: number;
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondata */
export interface ApplicationCommandInteractionData {
  /** the ID of the invoked command */
  id: string;
  /** the name of the invoked command */
  name: string;
  /** the params + values from the user */
  ooptions?: ApplicationCommandInteractionDataOption[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondataoption */
export interface ApplicationCommandInteractionDataOption {
  /** the name of the parameter */
  name: string;
  /** the value of the pair */
  value?: ApplicationCommandOptionType;
  /** present if this option is a group or subcommand */
  options?: ApplicationCommandInteractionDataOption[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response */
export interface InteractionResponse {
  /** the type of response */
  type: InteractionResponseType;
  /** an optional response message */
  data?: InteractionApplicationCommandCallbackData;
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionapplicationcommandcallbackdata */
export interface InteractionApplicationCommandCallbackData {
  /** is the response TTS */
  tts?: boolean;
  /** message content */
  content: string;
  /** supports up to 10 embeds */
  embeds?: Embed[];
  /** allowed mentions object */
  allowedMenntions?: AllowedMentionType;
}
