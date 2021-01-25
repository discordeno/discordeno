import { encode } from "../../deps.ts";
import {
  ActivityType,
  ImageFormats,
  ImageSize,
  StatusType,
} from "../types/mod.ts";
import { sendGatewayCommand } from "../ws/shard_manager.ts";

export const sleep = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export interface BotStatusRequest {
  status: StatusType;
  game: {
    name?: string;
    type: ActivityType;
  };
}

export function editBotsStatus(
  status: StatusType,
  name?: string,
  type = ActivityType.Game,
) {
  sendGatewayCommand("EDIT_BOTS_STATUS", { status, game: { name, type } });
}

export function chooseRandom<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
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

function camelToSnakeCase(string: string) {
  return string.replace(/ID|[A-Z]/g, ($1) => {
    if ($1 === "ID") return "_id";
    return `_${$1.toLowerCase()}`;
  });
}

function snakeToCamelCase(string: string) {
  return string.replace(/_id|([-_][a-z])/ig, ($1) => {
    if ($1 === "_id") return "ID";
    return $1.toUpperCase().replace("_", "");
  });
}

function isObject(object: unknown) {
  return object === Object(object) && !Array.isArray(object) &&
    typeof object !== "function";
}
// deno-lint-ignore no-explicit-any
export function camelKeysToSnakeCase(object: Record<string, any>) {
  if (isObject(object)) {
    // deno-lint-ignore no-explicit-any
    const convertedObject: Record<string, any> = {};
    Object.keys(object)
      .forEach((key) => {
        convertedObject[camelToSnakeCase(key)] = camelKeysToSnakeCase(
          object[key],
        );
      });
    return convertedObject;
  } else if (Array.isArray(object)) {
    object = object.map((element) => camelKeysToSnakeCase(element));
  }
  return object;
}

// deno-lint-ignore no-explicit-any
export function snakeKeysToCamelCase(object: Record<string, any>) {
  if (isObject(object)) {
    // deno-lint-ignore no-explicit-any
    const convertedObject: Record<string, any> = {};
    Object.keys(object)
      .forEach((key) => {
        convertedObject[snakeToCamelCase(key)] = snakeKeysToCamelCase(
          object[key],
        );
      });
    return convertedObject;
  } else if (Array.isArray(object)) {
    object = object.map((element) => snakeKeysToCamelCase(element));
  }
  return object;
}
