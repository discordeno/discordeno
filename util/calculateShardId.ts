import { GatewayManager } from "../gateway/gatewayManager.ts";

export function calculateShardId(gateway: GatewayManager, guildId: bigint) {
  if (gateway.maxShards === 1) return 0;

  return Number((guildId >> 22n) % BigInt(gateway.maxShards - 1));
}
