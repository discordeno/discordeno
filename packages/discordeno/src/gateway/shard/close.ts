import { Shard } from "./types.ts";

export function close(shard: Shard, code: number, reason: string): void {
  if (shard.socket?.readyState !== WebSocket.OPEN) return;

  return shard.socket?.close(code, reason);
}
