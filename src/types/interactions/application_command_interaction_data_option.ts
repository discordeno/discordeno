import { Channel } from "../channels/channel.ts";
import { Role } from "../permissions/role.ts";
import { User } from "../users/user.ts";
import { DiscordApplicationCommandOptionTypes } from "./application_command_option_types.ts";

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondataoption */
export type ApplicationCommandInteractionDataOption =
  | ApplicationCommandInteractionDataOptionSubCommand
  | ApplicationCommandInteractionDataOptionSubCommandGroup
  | ApplicationCommandInteractionDataOptionString
  | ApplicationCommandInteractionDataOptionInteger
  | ApplicationCommandInteractionDataOptionBoolean
  | ApplicationCommandInteractionDataOptionUser
  | ApplicationCommandInteractionDataOptionChannel
  | ApplicationCommandInteractionDataOptionRole
  | ApplicationCommandInteractionDataOptionMentionable;

interface ApplicationCommandInteractionDataOptionBase<
  T extends DiscordApplicationCommandOptionTypes,
  V = unknown,
> {
  /** The name of the parameter */
  name: string;
  /** Type of the option */
  type: T;
  /** The value of the pair */
  value: V;
}

export interface ApplicationCommandInteractionDataOptionSubCommand
  extends
    ApplicationCommandInteractionDataOptionBase<
      DiscordApplicationCommandOptionTypes.SUB_COMMAND
    > {
  /** Present if this option is a group or subcommand */
  options?: ApplicationCommandInteractionDataOption[];
}

export interface ApplicationCommandInteractionDataOptionSubCommandGroup
  extends
    ApplicationCommandInteractionDataOptionBase<
      DiscordApplicationCommandOptionTypes.SUB_COMMAND_GROUP
    > {
  /** Present if this option is a group or subcommand */
  options?: ApplicationCommandInteractionDataOption[];
}

export type ApplicationCommandInteractionDataOptionString =
  ApplicationCommandInteractionDataOptionBase<
    DiscordApplicationCommandOptionTypes.STRING,
    string
  >;

export type ApplicationCommandInteractionDataOptionInteger =
  ApplicationCommandInteractionDataOptionBase<
    DiscordApplicationCommandOptionTypes.INTEGER,
    number
  >;

export type ApplicationCommandInteractionDataOptionBoolean =
  ApplicationCommandInteractionDataOptionBase<
    DiscordApplicationCommandOptionTypes.BOOLEAN,
    boolean
  >;

export type ApplicationCommandInteractionDataOptionUser =
  ApplicationCommandInteractionDataOptionBase<
    DiscordApplicationCommandOptionTypes.USER,
    User
  >;

export type ApplicationCommandInteractionDataOptionChannel =
  ApplicationCommandInteractionDataOptionBase<
    DiscordApplicationCommandOptionTypes.CHANNEL,
    Channel
  >;

export type ApplicationCommandInteractionDataOptionRole =
  ApplicationCommandInteractionDataOptionBase<
    DiscordApplicationCommandOptionTypes.ROLE,
    Role
  >;

export type ApplicationCommandInteractionDataOptionMentionable =
  ApplicationCommandInteractionDataOptionBase<
    DiscordApplicationCommandOptionTypes.MENTIONABLE,
    bigint
  >;
