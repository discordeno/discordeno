export {
  connectWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  isWebSocketPongEvent,
} from "https://deno.land/std@0.67.0/ws/mod.ts";
export type { WebSocket } from "https://deno.land/std@0.67.0/ws/mod.ts";
export { delay } from "https://deno.land/std@0.75.0/async/delay.ts";
export { encode } from "https://deno.land/std@0.75.0/encoding/base64.ts";
export {
  assert,
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.75.0/testing/asserts.ts";
export { decompress_with as inflate } from "https://unpkg.com/@evan/wasm@0.0.12/target/zlib/deno.js";
