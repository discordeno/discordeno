import {
  DiscordChannel,
  DiscordMember,
  DiscordRole,
  DiscordUser,
} from "./mod.ts";

export interface DiscordInteractionCommand {
  /** id of the interaction */
  id: string;
  /** the type of interaction */
  type: DiscordInteractionType;
  /** the command data payload */
  data?: DiscordInteractionData;
  /** the guild it was sent from */
  guild_id: string;
  /** the channel it was sent from */
  channel_id: string;
  /** guild member data for the invoking user */
  member: DiscordMember;
  /** a continuation token for responding to the interaction */
  token: string;
  /** read-only property, always 1 */
  version: number;
}

export enum DiscordInteractionType {
  /** This type is for ACK on webhook only setup. Discord may send these which require. In a sense its a heartbeat. */
  PING = 1,
  /** Slash commands */
  APPLICATION_COMMAND,
}

export interface DiscordInteractionData {
  /** the ID of the invoked command */
  id: string;
  /** the name of the invoked command */
  name: string;
  /** converted users + roles + channels */
  resolved?: DiscordApplicationCommandInteractionDataResolved;
  /** the params + values from the user */
  options?: DiscordInteractionDataOption[];
}

export interface DiscordApplicationCommandInteractionDataResolved {
  /** the IDs and User objects */
  users?: Record<string, DiscordUser>;
  /** the IDs and partial Member objects */
  members?: Record<string, Omit<DiscordMember, "user" | "deaf" | "mute">>;
  /** the IDs and Role objects */
  roles?: Record<string, DiscordRole>;
  /** the IDs and partial Channel objects */
  channels?: Record<
    string,
    Pick<DiscordChannel, "id" | "name" | "type" | "permission_overwrites">
  >;
}

export interface DiscordInteractionDataOption {
  /** the name of the parameter */
  name: string;
  /** the value of the pair. present if there was no more options */
  value?: string | number;
  /** present if this option is a group or subcommand */
  options?: DiscordInteractionDataOption[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommand */
export interface DiscordApplicationCommand {
  /** unique id of the command */
  id: string;
  /** unique id of the parent application */
  "application_id": string;
  /** 3-32 character name matching `^[\w-]{3,32}$` */
  name: string;
  /** 1-100 character description */
  description: string;
  /** the parameters for the command */
  options?: DiscordApplicationCommandOption[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption */
export interface DiscordApplicationCommandOption {
  /** the type of the option */
  type: DiscordApplicationCommandOptionType;
  /** 1-32 character name matching `^[\w-]{1,32}$` */
  name: string;
  /** 1-100 character description */
  description: string;
  /** the first `required` option for the user to complete--only one option can be `default` */
  default?: boolean;
  /** if the parameter is required or optional--default `false` */
  required?: boolean;
  /** choices for `string` and `int` types for the user to pick from */
  choices?: DiscordApplicationCommandOptionChoice[];
  /** if the option is a subcommand or subcommand group type, this nested options will be the parameters */
  options?: DiscordApplicationCommandOption[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#Discordapplicationcommandoptiontype */
export enum DiscordApplicationCommandOptionType {
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
export interface DiscordApplicationCommandOptionChoice {
  /** 1-100 character choice name */
  name: string;
  /** value of the choice */
  value: string | number;
}

export type DiscordApplicationCommandEvent = DiscordApplicationCommand & {
  /** id of the guild the command is in */
  guild_id?: string;
};
