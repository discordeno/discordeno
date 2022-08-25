import {
  ApplicationCommandOption,
  ApplicationCommandOptionTypes,
  Bot,
  Channel,
  ChannelTypes,
  Collection,
  InteractionDataOption,
  Member,
  Message,
  Role,
  User,
} from "../../deps.ts";
import { getLanguage, translate } from "../bot/languages/translate.ts";
import { SNOWFLAKE_REGEX } from "../constants/regexes.ts";

// Mapped by `language-commandName`
const translatedOptionNamesCache = new Map<string, Record<string, string>>();

/** Translates all options of the command to an object: translatedOptionName: optionName */
export function translateOptionNames(
  bot: Bot,
  guildId: bigint,
  options: ApplicationCommandOption[],
  commandName?: string,
): Record<string, string> {
  const language = getLanguage(guildId);
  // RETURN THE ALREADY TRANSLATED OPTIONS WHICH ARE IN CACHE
  if (
    commandName && translatedOptionNamesCache.has(`${language}-${commandName}`)
  ) {
    return translatedOptionNamesCache.get(`${language}-${commandName}`)!;
  }

  // TRANSLATE ALL OPTIONS
  let translated: Record<string, string> = {};
  for (const option of options) {
    // @ts-ignore ts being dumb
    translated[translate(bot, guildId, option.name).toLowerCase()] = translate(
      bot,
      "english",
      // @ts-ignore ts being dumb
      option.name,
    );
    if (option.options) {
      translated = {
        ...translated,
        ...translateOptionNames(bot, guildId, option.options),
      };
    }
  }

  // SAVE THE TRANSLATED OPTIONS IN CACHE FOR FASTER ACCESS
  if (commandName) {
    translatedOptionNamesCache.set(`${language}-${commandName}`, translated);
  }

  return translated;
}

function convertOptionValue(
  option: InteractionDataOption,
  resolved?: {
    /** The Ids and Message objects */
    messages?: Collection<bigint, Message>;
    /** The Ids and User objects */
    users?: Collection<bigint, User>;
    /** The Ids and partial Member objects */
    members?: Collection<bigint, Member>;
    /** The Ids and Role objects */
    roles?: Collection<bigint, Role>;
    /** The Ids and partial Channel objects */
    channels?: Collection<
      bigint,
      {
        id: bigint;
        name: string;
        type: ChannelTypes;
        permissions: bigint;
      }
    >;
  },
  translateOptions?: Record<string, string>,
): [
  string,
  (
    | { user: User; member: Member }
    | Role
    | {
      id: bigint;
      name: string;
      type: ChannelTypes;
      permissions: bigint;
    }
    | boolean
    | string
    | number
  ),
] {
  const value = typeof option.value === "string" && SNOWFLAKE_REGEX.test(option.value) ? BigInt(option.value) : 0n;
  // THE OPTION IS A CHANNEL
  if (option.type === ApplicationCommandOptionTypes.Channel) {
    const channel = resolved?.channels?.get(value);

    // SAVE THE ARGUMENT WITH THE CORRECT NAME
    return [translateOptions?.[option.name] ?? option.name, channel!];
  }

  // THE OPTION IS A ROLE
  if (option.type === ApplicationCommandOptionTypes.Role) {
    const role = resolved?.roles?.get(value);

    // SAVE THE ARGUMENT WITH THE CORRECT NAME
    return [translateOptions?.[option.name] ?? option.name, role!];
  }

  // THE OPTION IS A USER
  if (option.type === ApplicationCommandOptionTypes.User) {
    const user = resolved?.users?.get(value);
    const member = resolved?.members?.get(value);

    // SAVE THE ARGUMENT WITH THE CORRECT NAME
    return [
      translateOptions?.[option.name] ?? option.name,
      {
        member: member!,
        user: user!,
      },
    ];
  }

  // THE OPTION IS A MENTIONABLE
  if (option.type === ApplicationCommandOptionTypes.Mentionable) {
    const role = resolved?.roles?.get(value);
    const user = resolved?.users?.get(value);
    const member = resolved?.members?.get(value);

    const final = user && member ? { user, member } : role!;

    // SAVE THE ARGUMENT WITH THE CORRECT NAME
    return [translateOptions?.[option.name] ?? option.name, final];
  }

  // THE REST OF OPTIONS DON'T NEED ANY CONVERSION
  // SAVE THE ARGUMENT WITH THE CORRECT NAME
  // @ts-ignore ts leave me alone
  return [translateOptions?.[option.name] ?? option.name, option.value];
}

/** Parse the options to a nice object.
 * NOTE: this does not work with subcommands
 */
export function optionParser(
  options?: InteractionDataOption[],
  resolved?: {
    /** The Ids and Message objects */
    messages?: Collection<bigint, Message>;
    /** The Ids and User objects */
    users?: Collection<bigint, User>;
    /** The Ids and partial Member objects */
    members?: Collection<bigint, Member>;
    /** The Ids and Role objects */
    roles?: Collection<bigint, Role>;
    /** The Ids and partial Channel objects */
    channels?: Collection<
      bigint,
      {
        id: bigint;
        name: string;
        type: ChannelTypes;
        permissions: bigint;
      }
    >;
  },
  translateOptions?: Record<string, string>,
):
  | InteractionCommandArgs
  | { [key: string]: InteractionCommandArgs }
  | { [key: string]: { [key: string]: InteractionCommandArgs } } {
  // OPTIONS CAN BE UNDEFINED SO WE JUST RETURN AN EMPTY OBJECT
  if (!options) return {};

  // A SUBCOMMAND WAS USED
  if (options[0].type === ApplicationCommandOptionTypes.SubCommand) {
    const convertedOptions: Record<
      string,
      | { user: User; member: Member }
      | Role
      | {
        id: bigint;
        name: string;
        type: ChannelTypes;
        permissions: bigint;
      }
      | boolean
      | string
      | number
    > = {};
    // CONVERT ALL THE OPTIONS
    for (const option of options[0].options ?? []) {
      const [name, value] = convertOptionValue(
        option,
        resolved,
        translateOptions,
      );
      convertedOptions[name] = value;
    }

    // @ts-ignore ts leave me alone
    return {
      [translateOptions?.[options[0].name] ?? options[0].name]: convertedOptions,
    };
  }

  // A SUBCOMMAND GROUP WAS USED
  if (options[0].type === ApplicationCommandOptionTypes.SubCommandGroup) {
    const convertedOptions: Record<
      string,
      | Member
      | Role
      | Channel
      | boolean
      | string
      | number
    > = {};
    // CONVERT ALL THE OPTIONS
    for (const option of options[0].options![0].options ?? []) {
      const [name, value] = convertOptionValue(
        option,
        resolved,
        translateOptions,
      );
      // @ts-ignore ts leave me alone
      convertedOptions[name] = value;
    }

    // @ts-ignore ts leave me alone
    return {
      [translateOptions?.[options[0].name] ?? options[0].name]: {
        [
          translateOptions?.[options[0].options![0].name] ??
            options[0].options![0].name
        ]: convertedOptions,
      },
    };
  }

  // A NORMAL COMMAND WAS USED
  const convertedOptions: Record<
    string,
    | Member
    | Role
    | Record<
      string,
      Pick<Channel, "id" | "name" | "type" | "permissions">
    >
    | boolean
    | string
    | number
  > = {};
  for (const option of options ?? []) {
    const [name, value] = convertOptionValue(
      option,
      resolved,
      translateOptions,
    );
    // @ts-ignore ts leave me alone
    convertedOptions[name] = value;
  }

  return convertedOptions;
}

/** The interaction arguments.
 * Important the members `deaf` and `mute` properties will always be false.
 */
export type InteractionCommandArgs = Record<
  string,
  | Member
  | Role
  | Record<
    string,
    Pick<Channel, "id" | "name" | "type" | "permissions">
  >
  | boolean
  | string
  | number
>;
