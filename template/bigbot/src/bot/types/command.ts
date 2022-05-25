import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  Channel,
  Interaction,
  Member,
  PermissionStrings,
  Role,
  User,
} from "../../../deps.ts";
import { PermissionLevelHandlers } from "../../utils/permLevels.ts";
import { BotClient } from "../botClient.ts";
import english from "../languages/english.ts";
import { translationKeys } from "../languages/translate.ts";

// deno-lint-ignore no-explicit-any
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

type Identity<T> = { [P in keyof T]: T[P] };

// TODO: make required by default true
// Define each of the types here
type BaseDefinition = {
  description: translationKeys;
};

// Subcommand
type SubcommandArgumentDefinition<N extends translationKeys = translationKeys> =
  & BaseDefinition
  & {
    name: N;
    type: ApplicationCommandOptionTypes.SubCommand;
    // options: Omit<ArgumentDefinition, 'SubcommandArgumentDefinition' | 'SubcommandGroupArgumentDefinition'>[]
    options?: readonly ArgumentDefinition[];
  };

// SubcommandGroup
type SubcommandGroupArgumentDefinition<
  N extends translationKeys = translationKeys,
> = BaseDefinition & {
  name: N;
  type: ApplicationCommandOptionTypes.SubCommandGroup;
  options: readonly SubcommandArgumentDefinition[];
};

// String
type StringArgumentDefinition<N extends translationKeys = translationKeys> =
  & BaseDefinition
  & {
    name: N;
    type: ApplicationCommandOptionTypes.String;
    choices?: readonly { name: string; value: string }[];
    required?: true;
  };
type StringOptionalArgumentDefinition<
  N extends translationKeys = translationKeys,
> = BaseDefinition & {
  name: N;
  type: ApplicationCommandOptionTypes.String;
  choices?: readonly { name: string; value: string }[];
  required?: false;
};

// Integer
type IntegerArgumentDefinition<N extends translationKeys = translationKeys> =
  & BaseDefinition
  & {
    name: N;
    type: ApplicationCommandOptionTypes.Integer;
    choices?: readonly { name: string; value: number }[];
    required: true;
  };
type IntegerOptionalArgumentDefinition<
  N extends translationKeys = translationKeys,
> = BaseDefinition & {
  name: N;
  type: ApplicationCommandOptionTypes.Integer;
  choices?: readonly { name: string; value: number }[];
  required?: false;
};

// BOOLEAN
type BooleanArgumentDefinition<N extends translationKeys = translationKeys> =
  & BaseDefinition
  & {
    name: N;
    type: ApplicationCommandOptionTypes.Boolean;
    required: true;
  };
type BooleanOptionalArgumentDefinition<
  N extends translationKeys = translationKeys,
> = BaseDefinition & {
  name: N;
  type: ApplicationCommandOptionTypes.Boolean;
  required?: false;
};

// USER
type UserArgumentDefinition<N extends translationKeys = translationKeys> =
  & BaseDefinition
  & {
    name: N;
    type: ApplicationCommandOptionTypes.User;
    required: true;
  };
type UserOptionalArgumentDefinition<
  N extends translationKeys = translationKeys,
> = BaseDefinition & {
  name: N;
  type: ApplicationCommandOptionTypes.User;
  required?: false;
};

// CHANNEL
type ChannelArgumentDefinition<N extends translationKeys = translationKeys> =
  & BaseDefinition
  & {
    name: N;
    type: ApplicationCommandOptionTypes.Channel;
    required: true;
  };
type ChannelOptionalArgumentDefinition<
  N extends translationKeys = translationKeys,
> = BaseDefinition & {
  name: N;
  type: ApplicationCommandOptionTypes.Channel;
  required?: false;
};

// ROLE
type RoleArgumentDefinition<N extends translationKeys = translationKeys> =
  & BaseDefinition
  & {
    name: N;
    type: ApplicationCommandOptionTypes.Role;
    required: true;
  };
type RoleOptionalArgumentDefinition<
  N extends translationKeys = translationKeys,
> = BaseDefinition & {
  name: N;
  type: ApplicationCommandOptionTypes.Role;
  required?: false;
};

// MENTIONABLE
type MentionableArgumentDefinition<
  N extends translationKeys = translationKeys,
> = BaseDefinition & {
  name: N;
  type: ApplicationCommandOptionTypes.Mentionable;
  required: true;
};
type MentionableOptionalArgumentDefinition<
  N extends translationKeys = translationKeys,
> = BaseDefinition & {
  name: N;
  type: ApplicationCommandOptionTypes.Mentionable;
  required?: false;
};

// Add each of known ArgumentDefinitions to this union.
export type ArgumentDefinition =
  | StringArgumentDefinition
  | StringOptionalArgumentDefinition
  | IntegerArgumentDefinition
  | IntegerOptionalArgumentDefinition
  | BooleanArgumentDefinition
  | BooleanOptionalArgumentDefinition
  | UserArgumentDefinition
  | UserOptionalArgumentDefinition
  | ChannelArgumentDefinition
  | ChannelOptionalArgumentDefinition
  | RoleArgumentDefinition
  | RoleOptionalArgumentDefinition
  | MentionableArgumentDefinition
  | MentionableOptionalArgumentDefinition
  | SubcommandArgumentDefinition
  | SubcommandGroupArgumentDefinition;

type getName<K extends translationKeys> = typeof english[K] extends string ? typeof english[K]
  : never;

// OPTIONALS MUST BE FIRST!!!
export type ConvertArgumentDefinitionsToArgs<
  T extends readonly ArgumentDefinition[],
> = Identity<
  UnionToIntersection<
    {
      [P in keyof T]: T[P] extends StringOptionalArgumentDefinition<infer N> // STRING
        ? {
          [_ in getName<N>]?: T[P]["choices"] extends readonly { name: string; value: string }[] ? // @ts-ignore ts being dumb
          T[P]["choices"][number]["value"]
            : string;
        }
        : T[P] extends StringArgumentDefinition<infer N> ? {
          [_ in getName<N>]: T[P]["choices"] extends readonly { name: string; value: string }[] ? // @ts-ignore ts being dumb
          T[P]["choices"][number]["value"]
            : string;
        }
        : // INTEGER
        T[P] extends IntegerOptionalArgumentDefinition<infer N> ? {
          [_ in getName<N>]?: T[P]["choices"] extends readonly { name: string; value: number }[] ? // @ts-ignore ts being dumb
          T[P]["choices"][number]["value"]
            : number;
        }
        : T[P] extends IntegerArgumentDefinition<infer N> ? {
          [_ in getName<N>]: T[P]["choices"] extends readonly { name: string; value: number }[] ? // @ts-ignore ts being dumb
          T[P]["choices"][number]["value"]
            : number;
        }
        : // BOOLEAN
        T[P] extends BooleanOptionalArgumentDefinition<infer N> ? { [_ in getName<N>]?: boolean }
        : T[P] extends BooleanArgumentDefinition<infer N> ? { [_ in getName<N>]: boolean }
        : // USER
        T[P] extends UserOptionalArgumentDefinition<infer N> ? {
          [_ in getName<N>]?: {
            user: User;
            member: Member;
          };
        }
        : T[P] extends UserArgumentDefinition<infer N> ? {
          [_ in getName<N>]: {
            user: User;
            member: Member;
          };
        }
        : // CHANNEL
        T[P] extends ChannelOptionalArgumentDefinition<infer N> ? { [_ in getName<N>]?: Channel }
        : T[P] extends ChannelArgumentDefinition<infer N> ? { [_ in getName<N>]: Channel }
        : // ROLE
        T[P] extends RoleOptionalArgumentDefinition<infer N> ? { [_ in getName<N>]?: Role }
        : T[P] extends RoleArgumentDefinition<infer N> ? { [_ in getName<N>]: Role }
        : // MENTIONABLE
        T[P] extends MentionableOptionalArgumentDefinition<infer N> ? {
          [_ in getName<N>]?: Role | {
            user: User;
            member: Member;
          };
        }
        : T[P] extends MentionableArgumentDefinition<infer N> ? {
          [_ in getName<N>]: Role | {
            user: User;
            member: Member;
          };
        }
        : // SUBCOMMAND
        T[P] extends SubcommandArgumentDefinition<infer N> ? {
          [_ in getName<N>]?: T[P]["options"] extends readonly ArgumentDefinition[] ? // @ts-ignore ignore this for a bit
          ConvertArgumentDefinitionsToArgs<T[P]["options"]>
            : // deno-lint-ignore ban-types
            {};
        }
        : // SUBCOMMAND GROUP
        T[P] extends SubcommandGroupArgumentDefinition<infer N> ? {
          [_ in getName<N>]?: ConvertArgumentDefinitionsToArgs<
            T[P]["options"]
          >;
        }
        : never;
    }[number]
  >
>;

export interface Command<T extends readonly ArgumentDefinition[]> {
  /** The name of the command, used for both slash and message commands. */
  name: translationKeys;
  /** The type of command. */
  type?: ApplicationCommandTypes;
  /** The description of the command*/
  description: translationKeys;
  // TODO: consider type being a string like "number" | "user" for better ux
  /** The options for the command, used for both slash and message commands. */
  // options?: ApplicationCommandOption[];
  options?: T;
  execute: (
    bot: BotClient,
    data: Interaction,
    args: ConvertArgumentDefinitionsToArgs<T>,
  ) => unknown;
  subcommands?: Record<
    string,
    // deno-lint-ignore no-explicit-any
    Omit<Command<any>, "subcommands"> & { group?: string }
  >;
  /** Whether the command should have a cooldown */
  cooldown?: {
    /** How long the user needs to wait after the first execution until he can use the command again */
    seconds: number;
    /** How often the user is allowed to use the command until he is in cooldown */
    allowedUses?: number;
  };
  nsfw?: boolean;
  /** By default false */
  global?: boolean;
  /** Dm only by default false */
  dmOnly?: boolean;

  advanced?: boolean;

  /** Whether or not this slash command should be enabled right now. Defaults to true. */
  enabled?: boolean;
  /** Whether or not this command is still in development and should be setup in the dev server for testing. */
  dev?: boolean;
  /** Whether or not this command will take longer than 3s and need to acknowledge to discord. */
  acknowledge?: boolean;

  permissionLevels?:
    | (keyof typeof PermissionLevelHandlers)[]
    | ((
      data: Interaction,
      command: Command<T>,
    ) => boolean | Promise<boolean>);
  botServerPermissions?: PermissionStrings[];
  botChannelPermissions?: PermissionStrings[];
  userServerPermissions?: PermissionStrings[];
  userChannelPermissions?: PermissionStrings[];
}

export enum PermissionLevels {
  Member,
  Moderator,
  Admin,
  ServerOwner,
  BotSupporter,
  BotDev,
  BotOwner,
}
