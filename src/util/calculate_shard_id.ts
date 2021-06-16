import { ws } from "../ws/ws.ts";

export function calculateShardId(guildId: bigint) {
  if (ws.maxShards === 1) return 0;

  return Number((guildId >> 22n) % BigInt(ws.maxShards - 1));
}
