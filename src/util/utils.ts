import { encode } from "../../deps.ts";
import { basicShards, sendWS } from "../ws/shard.ts";
import { SLASH_COMMANDS_NAME_REGEX } from "./constants.ts";

export const sleep = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export function editBotStatus(
  data: Pick<GatewayStatusUpdatePayload, "activities" | "status">,
) {
  basicShards.forEach((shard) => {
    sendWS({
      op: GatewayOpcode.StatusUpdate,
      d: {
        since: null,
        afk: false,
        ...data,
      },
    }, shard.id);
  });
}

export async function urlToBase64(url: string) {
  const buffer = await fetch(url).then((res) => res.arrayBuffer());
  const imageStr = encode(buffer);
  const type = url.substring(url.lastIndexOf(".") + 1);
  return `data:image/${type};base64,${imageStr}`;
}

/** Allows easy way to add a prop to a base object when needing to use complicated getters solution. */
// deno-lint-ignore no-explicit-any
export function createNewProp(value: any): Partial<PropertyDescriptor> {
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
  size: ImageSize = 128,
  format?: ImageFormats,
) => {
  return `${url}.${format ||
    (url.includes("/a_") ? "gif" : "jpg")}?size=${size}`;
};

function camelToSnakeCase(text: string) {
  return text.replace(/ID|[A-Z]/g, ($1) => {
    if ($1 === "ID") return "_id";

    return `_${$1.toLowerCase()}`;
  });
}

function snakeToCamelCase(text: string) {
  return text.replace(/_id|([-_][a-z])/ig, ($1) => {
    if ($1 === "_id") return "ID";

    return $1.toUpperCase().replace("_", "");
  });
}

function isObject(obj: unknown) {
  return obj === Object(obj) && !Array.isArray(obj) &&
    typeof obj !== "function";
}

// deno-lint-ignore no-explicit-any
export function camelKeysToSnakeCase(obj: Record<string, any>) {
  if (isObject(obj)) {
    // deno-lint-ignore no-explicit-any
    const convertedObject: Record<string, any> = {};

    Object.keys(obj)
      .forEach((key) => {
        convertedObject[camelToSnakeCase(key)] = camelKeysToSnakeCase(
          obj[key],
        );
      });

    return convertedObject;
  } else if (Array.isArray(obj)) {
    obj = obj.map((element) => camelKeysToSnakeCase(element));
  }

  return obj;
}

// deno-lint-ignore no-explicit-any
export function snakeKeysToCamelCase(obj: Record<string, any>) {
  if (isObject(obj)) {
    // deno-lint-ignore no-explicit-any
    const convertedObject: Record<string, any> = {};

    Object.keys(obj)
      .forEach((key) => {
        convertedObject[snakeToCamelCase(key)] = snakeKeysToCamelCase(
          obj[key],
        );
      });

    return convertedObject;
  } else if (Array.isArray(obj)) {
    obj = obj.map((element) => snakeKeysToCamelCase(element));
  }

  return obj;
}

/** @private */
function validateSlashOptionChoices(
  choices: SlashCommandOptionChoice[],
  optionType: SlashCommandOptionType,
) {
  for (const choice of choices) {
    if ([...choice.name].length < 1 || [...choice.name].length > 100) {
      throw new Error(Errors.INVALID_SLASH_OPTIONS_CHOICES);
    }

    if (
      (optionType === SlashCommandOptionType.STRING &&
        (typeof choice.value !== "string" || choice.value.length < 1 ||
          choice.value.length > 100)) ||
      (optionType === SlashCommandOptionType.INTEGER &&
        typeof choice.value !== "number")
    ) {
      throw new Error(Errors.INVALID_SLASH_OPTIONS_CHOICES);
    }
  }
}

/** @private */
function validateSlashOptions(options: SlashCommandOption[]) {
  for (const option of options) {
    if (
      (option.choices?.length && option.choices.length > 25) ||
      option.type !== SlashCommandOptionType.STRING &&
        option.type !== SlashCommandOptionType.INTEGER
    ) {
      throw new Error(Errors.INVALID_SLASH_OPTIONS_CHOICES);
    }

    if (
      ([...option.name].length < 1 || [...option.name].length > 32) ||
      ([...option.description].length < 1 ||
        [...option.description].length > 100)
    ) {
      throw new Error(Errors.INVALID_SLASH_OPTIONS_CHOICES);
    }

    if (option.choices) {
      validateSlashOptionChoices(option.choices, option.type);
    }
  }
}

/** @private */
export function validateSlashCommands(
  commands: UpsertSlashCommandOptions[],
  create = false,
) {
  for (const command of commands) {
    if (
      (command.name && !SLASH_COMMANDS_NAME_REGEX.test(command.name)) ||
      (create && !command.name)
    ) {
      throw new Error(Errors.INVALID_SLASH_NAME);
    }

    if (
      (command.description &&
        ([...command.description].length < 1 ||
          [...command.description].length > 100)) ||
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
