import { AllowedMentionsPayload, EmbedPayload } from "./channel.ts";
import { GuildMemberPayload } from "./guild.ts";

/** https://discord.com/developers/docs/interactions/slash-commands#create-global-application-command */
export interface ApplicationCommandParams {
  /** 3-32 character command name */
  name: string;
  /** 1-100 character description */
  description: string;
  /** the parameters for the command */
  options?: ApplicationCommandParam[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommand */
export interface ApplicationCommandPayload {
  /** unique id of the command */
  id: string;
  /** unique id of the parent application */
  application_id: string;
  /** 3-32 character name matching ^[\w-]{3,32}$ */
  name: string;
  /** 1-100 character description */
  description: string;
  /** the parameters for the command */
  options?: ApplicationCommandParam[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption */
export interface ApplicationCommandParam {
  /** value of ApplicationCommandOptionType */
  type: ApplicationCommandOptionTypes;
  /** 1-32 character name matching ^[\w-]{1,32}$ */
  name: string;
  /** 1-100 character description */
  description: string;
  /** the first required option for the user to complete--only one option can be default */
  default?: boolean;
  /** if the parameter is required or optional--default false */
  required?: boolean;
  /** choices for string and number types for the user to pick from */
  choices?: ApplicationCommandOptionChoicePayload[];
  /** if the option is a subcommand or subcommand group type, this nested options will be the parameters */
  options?: ApplicationCommandParam[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype */
export enum ApplicationCommandOptionTypes {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP,
  STRING,
  INTEGER,
  BOOLEAN,
  USER,
  CHANNEL,
  ROLE,
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptionchoice */
export interface ApplicationCommandOptionChoicePayload {
  /** 1-100 character choice name */
  name: string;
  /** value of the choice */
  value: string | number;
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction */
export interface InteractionPayload {
  /** id of the interaction */
  id: string;
  /** the type of interaction */
  type: InteractionTypes;
  /** the command data payload */
  data?: ApplicationCommandInteractionDataPayload;
  /** the guild it was sent from */
  guild_id: string;
  /** the channel it was sent from */
  channel_id: string;
  /** guild member data for the invoking user */
  member: GuildMemberPayload;
  /** a continuation token for responding to the interaction */
  token: string;
  /** read-only property, always 1 */
  version: number;
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-interactiontype */
export enum InteractionTypes {
  PING = 1,
  APPLICATION_COMMAND,
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondata */
export interface ApplicationCommandInteractionDataPayload {
  /** the ID of the invoked command */
  id: string;
  /** the name of the invoked command */
  name: string;
  /** the params + values from the user */
  ooptions?: ApplicationCommandInteractionDataParam[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondataoption */
export interface ApplicationCommandInteractionDataParam {
  /** the name of the parameter */
  name: string;
  /** the value of the pair */
  value?: ApplicationCommandOptionTypes;
  /** present if this option is a group or subcommand */
  options?: ApplicationCommandInteractionDataParam[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response */
export interface InteractionResponsePayload {
  /** the type of response */
  type: InteractionResponseTypes;
  /** an optional response message */
  data?: InteractionApplicationCommandCallbackDataPayload;
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionresponsetype */
export enum InteractionResponseTypes {
  PONG = 1,
  ACKNOWLEDGE,
  CHANNEL_MESSAGE,
  CHANNEL_MESSAGE_WITH_SOURCE,
  ACKNOWLEDGE_WITH_SOURCE,
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionapplicationcommandcallbackdata */
export interface InteractionApplicationCommandCallbackDataPayload {
  /** is the response TTS */
  tts?: boolean;
  /** message content */
  content: string;
  /** supports up to 10 embeds */
  embeds?: EmbedPayload[];
  /** allowed mentions object */
  allowed_mentions?: AllowedMentionsPayload;
}
