import { Shard } from "./types.ts";

export function isOpen(shard: Shard): boolean {
  return shard.socket?.readyState === WebSocket.OPEN;
}
