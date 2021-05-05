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
      DiscordApplicationCommandOptionTypes.SubCommand
    > {
  /** Present if this option is a group or subcommand */
  options?: ApplicationCommandInteractionDataOption[];
}

export interface ApplicationCommandInteractionDataOptionSubCommandGroup
  extends
    ApplicationCommandInteractionDataOptionBase<
      DiscordApplicationCommandOptionTypes.SubCommandGroup
    > {
  /** Present if this option is a group or subcommand */
  options?: ApplicationCommandInteractionDataOption[];
}

export type ApplicationCommandInteractionDataOptionString =
  ApplicationCommandInteractionDataOptionBase<
    DiscordApplicationCommandOptionTypes.String,
    string
  >;

export type ApplicationCommandInteractionDataOptionInteger =
  ApplicationCommandInteractionDataOptionBase<
    DiscordApplicationCommandOptionTypes.Integer,
    number
  >;

export type ApplicationCommandInteractionDataOptionBoolean =
  ApplicationCommandInteractionDataOptionBase<
    DiscordApplicationCommandOptionTypes.Boolean,
    boolean
  >;

export type ApplicationCommandInteractionDataOptionUser =
  ApplicationCommandInteractionDataOptionBase<
    DiscordApplicationCommandOptionTypes.User,
    bigint
  >;

export type ApplicationCommandInteractionDataOptionChannel =
  ApplicationCommandInteractionDataOptionBase<
    DiscordApplicationCommandOptionTypes.Channel,
    bigint
  >;

export type ApplicationCommandInteractionDataOptionRole =
  ApplicationCommandInteractionDataOptionBase<
    DiscordApplicationCommandOptionTypes.Role,
    bigint
  >;

export type ApplicationCommandInteractionDataOptionMentionable =
  ApplicationCommandInteractionDataOptionBase<
    DiscordApplicationCommandOptionTypes.Mentionable,
    bigint
  >;
