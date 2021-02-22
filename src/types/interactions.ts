import { MemberCreatePayload } from "./member.ts";

export interface InteractionCommandPayload {
  /** id of the interaction */
  id: string;
  /** the type of interaction */
  type: InteractionType;
  /** the command data payload */
  data?: InteractionData;
  /** the guild it was sent from */
  "guild_id": string;
  /** the channel it was sent from */
  "channel_id": string;
  /** guild member data for the invoking user */
  member: MemberCreatePayload;
  /** a continuation token for responding to the interaction */
  token: string;
}

export enum InteractionType {
  /** This type is for ACK on webhook only setup. Discord may send these which require. In a sense its a heartbeat. */
  PING = 1,
  /** Slash commands */
  APPLICATION_COMMAND,
}

export interface InteractionData {
  /** the ID of the invoked command */
  id: string;
  /** the name of the invoked command */
  name: string;
  /** the params + values from the user */
  options: InteractionDataOption[];
}

export interface InteractionDataOption {
  /** the name of the parameter */
  name: string;
  /** the value of the pair. present if there was no more options */
  value?: string | number;
  /** present if this option is a group or subcommand */
  options?: InteractionDataOption[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommand */
export interface ApplicationCommand {
  /** unique id of the command */
  id: string;
  /** unique id of the parent application */
  "application_id": string;
  /** 3-32 character name matching `^[\w-]{3,32}$` */
  name: string;
  /** 1-100 character description */
  description: string;
  /** the parameters for the command */
  options?: ApplicationCommandOption[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption */
export interface ApplicationCommandOption {
  /** the type of the option */
  type: ApplicationCommandOptionType;
  /** 1-32 character name matching `^[\w-]{1,32}$` */
  name: string;
  /** 1-100 character description */
  description: string;
  /** the first `required` option for the user to complete--only one option can be `default` */
  default?: boolean;
  /** if the parameter is required or optional--default `false` */
  required?: boolean;
  /** choices for `string` and `int` types for the user to pick from */
  choices?: ApplicationCommandOptionChoice[];
  /** if the option is a subcommand or subcommand group type, this nested options will be the parameters */
  options?: ApplicationCommandOption[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype */
export enum ApplicationCommandOptionType {
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
export interface ApplicationCommandOptionChoice {
  /** 1-100 character choice name */
  name: string;
  /** value of the choice */
  value: string | number;
}

// TODO: v11 Remove
/** @deprecated Use DiscordApplicationCommandEvent */
export type ApplicationCommandEvent = ApplicationCommand & {
  /** id of the guild the command is in */
  guild_id?: string;
};
