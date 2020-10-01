export type { WebSocket } from "https://deno.land/std@0.67.0/ws/mod.ts";

export { encode } from "https://deno.land/std@0.67.0/encoding/base64.ts";
export { delay } from "https://deno.land/std@0.67.0/async/delay.ts";
export { decompress as inflate } from "https://unpkg.com/@evan/wasm@0.0.9/target/zlib/deno.js";
export {
  connectWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  isWebSocketPongEvent,
} from "https://deno.land/std@0.67.0/ws/mod.ts";
