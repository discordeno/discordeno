import {
  _eventHandlers,
  EventHandlers,
  overloadEventHandlers,
} from "../../mod.ts";
import type { EventEmitter } from "https://deno.land/std@0.96.0/node/events.ts";

export function proxyEvent(emitter: EventEmitter) {
  overloadEventHandlers(
    new Proxy(_eventHandlers, {
      get(target, prop: keyof EventHandlers) {
        return target[prop] !== undefined
          ? target[prop]
          : ((...args: unknown[]) => emitter.emit(prop, ...args));
      },
    }),
  );
}
