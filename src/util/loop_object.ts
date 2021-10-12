import { Bot } from "../bot.ts";

export function loopObject<T = {}>(bot: Bot, obj: {}, handler: (value: unknown, key: string) => unknown, log: string) {
  let res: Record<string, unknown> | unknown[] = {};

  if (Array.isArray(obj)) {
    res = [];

    for (const o of obj) {
      if (typeof o === "object" && !Array.isArray(o) && o !== null) {
        // A nested object
        res.push(loopObject(bot, o as {}, handler, log));
      } else {
        res.push(handler(o, "array"));
      }
    }
  } else {
    for (const [key, value] of Object.entries(obj)) {
      bot.events.debug(log);

      if (
        Array.isArray(value) ||
        (typeof value === "object" && !Array.isArray(value) && value !== null && !(value instanceof Blob))
      ) {
        // A nested object
        res[key] = loopObject(bot, value as {}, handler, log);
      } else {
        res[key] = handler(value, key);
      }
    }
  }

  return res as T;
}
