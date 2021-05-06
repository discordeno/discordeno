import { encode } from "../../deps.ts";
import { eventHandlers } from "../bot.ts";
import { Errors } from "../types/discordeno/errors.ts";
import type { ApplicationCommandOption } from "../types/interactions/commands/application_command_option.ts";
import type { ApplicationCommandOptionChoice } from "../types/interactions/commands/application_command_option_choice.ts";
import { DiscordApplicationCommandOptionTypes } from "../types/interactions/commands/application_command_option_types.ts";
import type { CreateGlobalApplicationCommand } from "../types/interactions/commands/create_global_application_command.ts";
import type { EditGlobalApplicationCommand } from "../types/interactions/commands/edit_global_application_command.ts";
import type { DiscordImageFormat } from "../types/misc/image_format.ts";
import type { DiscordImageSize } from "../types/misc/image_size.ts";
import { SLASH_COMMANDS_NAME_REGEX } from "./constants.ts";
import { validateLength } from "./validate_length.ts";

export async function urlToBase64(url: string) {
  const buffer = await fetch(url).then((res) => res.arrayBuffer());
  const imageStr = encode(buffer);
  const type = url.substring(url.lastIndexOf(".") + 1);
  return `data:image/${type};base64,${imageStr}`;
}

/** Allows easy way to add a prop to a base object when needing to use complicated getters solution. */
// deno-lint-ignore no-explicit-any
export function createNewProp(value: any): PropertyDescriptor {
  return { configurable: true, enumerable: true, writable: true, value };
}

export function delay(ms: number): Promise<void> {
  return new Promise((res): number =>
    setTimeout((): void => {
      res();
    }, ms)
  );
}

export const formatImageURL = (
  url: string,
  size: DiscordImageSize = 128,
  format?: DiscordImageFormat,
) => {
  return `${url}.${format ||
    (url.includes("/a_") ? "gif" : "jpg")}?size=${size}`;
};

function camelToSnakeCase(text: string) {
  return text.replace(/[A-Z]/g, ($1) => `_${$1.toLowerCase()}`);
}

function snakeToCamelCase(text: string) {
  return text.replace(
    /([-_][a-z])/gi,
    ($1) => $1.toUpperCase().replace("_", ""),
  );
}

function isConvertableObject(obj: unknown) {
  return (
    obj === Object(obj) &&
    !Array.isArray(obj) &&
    typeof obj !== "function" &&
    !(obj instanceof Blob)
  );
}

export function snakelize<T>(
  // deno-lint-ignore no-explicit-any
  obj: Record<string, any> | Record<string, any>[],
): T {
  if (isConvertableObject(obj)) {
    // deno-lint-ignore no-explicit-any
    const convertedObject: Record<string, any> = {};

    Object.keys(obj).forEach((key) => {
      eventHandlers.debug?.(
        "loop",
        `Running forEach loop in snakelize function.`,
      );
      convertedObject[camelToSnakeCase(key)] = snakelize(
        // deno-lint-ignore no-explicit-any
        (obj as Record<string, any>)[key],
      );
    });

    return convertedObject as T;
  } else if (Array.isArray(obj)) {
    obj = obj.map((element) => snakelize(element));
  }

  return obj as T;
}

export function camelize<T>(
  // deno-lint-ignore no-explicit-any
  obj: Record<string, any> | Record<string, any>[],
): T {
  if (isConvertableObject(obj)) {
    // deno-lint-ignore no-explicit-any
    const convertedObject: Record<string, any> = {};

    Object.keys(obj).forEach((key) => {
      eventHandlers.debug?.(
        "loop",
        `Running forEach loop in camelize function.`,
      );
      convertedObject[snakeToCamelCase(key)] = camelize(
        // deno-lint-ignore no-explicit-any
        (obj as Record<string, any>)[key],
      );
    });

    return convertedObject as T;
  } else if (Array.isArray(obj)) {
    obj = obj.map((element) => camelize(element));
  }

  return obj as T;
}

/** @private */
function validateSlashOptionChoices(
  choices: ApplicationCommandOptionChoice[],
  optionType: DiscordApplicationCommandOptionTypes,
) {
  for (const choice of choices) {
    eventHandlers.debug?.(
      "loop",
      `Running for of loop in validateSlashOptionChoices function.`,
    );
    if (!validateLength(choice.name, { min: 1, max: 100 })) {
      throw new Error(Errors.INVALID_SLASH_OPTIONS_CHOICES);
    }

    if (
      (optionType === DiscordApplicationCommandOptionTypes.String &&
        (typeof choice.value !== "string" ||
          choice.value.length < 1 ||
          choice.value.length > 100)) ||
      (optionType === DiscordApplicationCommandOptionTypes.Integer &&
        typeof choice.value !== "number")
    ) {
      throw new Error(Errors.INVALID_SLASH_OPTIONS_CHOICES);
    }
  }
}

/** @private */
function validateSlashOptions(options: ApplicationCommandOption[]) {
  for (const option of options) {
    eventHandlers.debug?.(
      "loop",
      `Running for of loop in validateSlashOptions function.`,
    );
    if (
      option.choices?.length &&
      (option.choices.length > 25 ||
        (option.type !== DiscordApplicationCommandOptionTypes.String &&
          option.type !== DiscordApplicationCommandOptionTypes.Integer))
    ) {
      throw new Error(Errors.INVALID_SLASH_OPTIONS_CHOICES);
    }

    if (
      !validateLength(option.name, { min: 1, max: 32 }) ||
      !validateLength(option.description, { min: 1, max: 100 })
    ) {
      throw new Error(Errors.INVALID_SLASH_OPTIONS_CHOICES);
    }

    if (option.choices) {
      validateSlashOptionChoices(option.choices, option.type);
    }
  }
}

export function validateSlashCommands(
  commands: (CreateGlobalApplicationCommand | EditGlobalApplicationCommand)[],
  create = false,
) {
  for (const command of commands) {
    eventHandlers.debug?.(
      "loop",
      `Running for of loop in validateSlashCommands function.`,
    );
    if (
      (command.name && !SLASH_COMMANDS_NAME_REGEX.test(command.name)) ||
      (create && !command.name)
    ) {
      throw new Error(Errors.INVALID_SLASH_NAME);
    }

    if (
      (command.description &&
        !validateLength(command.description, { min: 1, max: 100 })) ||
      (create && !command.description)
    ) {
      throw new Error(Errors.INVALID_SLASH_DESCRIPTION);
    }

    if (command.options?.length) {
      if (command.options.length > 25) {
        throw new Error(Errors.INVALID_SLASH_OPTIONS);
      }

      validateSlashOptions(command.options);
    }
  }
}

// Typescript is not so good as we developers so we need this little utility function to help it out
// Taken from https://fettblog.eu/typescript-hasownproperty/
/** TS save way to check if a property exists in an object */
// deno-lint-ignore ban-types
export function hasOwnProperty<T extends {}, Y extends PropertyKey = string>(
  obj: T,
  prop: Y,
): obj is T & Record<Y, unknown> {
  // deno-lint-ignore no-prototype-builtins
  return obj.hasOwnProperty(prop);
}
