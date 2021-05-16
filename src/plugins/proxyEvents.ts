import { overloadEventHandlers, _eventHandlers } from "../bot.ts";
import type { EventHandlerFunctions } from "../types/discordeno/eventHandlers.ts";
import type { EventEmitter } from "https://deno.land/std@0.96.0/node/events.ts";

export function proxyEvent(emitter: EventEmitter) {
  overloadEventHandlers(new Proxy(_eventHandlers, {
    get(target, prop: keyof EventHandlerFunctions) {
      return target[prop] !== undefined ? target[prop] : ((...args: unknown[]) => emitter.emit(prop, ...args));
    },
  }));
}
