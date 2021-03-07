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
