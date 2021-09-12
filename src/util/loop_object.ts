import { eventHandlers } from "../bot.ts";

export function loopObject<T = {}>(obj: {}, handler: (value: unknown, key: string) => unknown, log: string) {
  let res: Record<string, unknown> | unknown[] = {};

  if (Array.isArray(obj)) {
    res = [];

    for (const o of obj) {
      if (typeof o === "object" && !Array.isArray(o) && o !== null) {
        // A nested object
        res.push(loopObject(o as {}, handler, log));
      } else {
        res.push(handler(o, "array"));
      }
    }
  } else {
    for (const [key, value] of Object.entries(obj)) {
      eventHandlers.debug?.("loop", log);

      if (typeof value === "object" && !Array.isArray(value) && value !== null && !(value instanceof Blob)) {
        // A nested object
        res[key] = loopObject(value as {}, handler, log);
      } else {
        res[key] = handler(value, key);
      }
    }
  }

  return res as T;
}
