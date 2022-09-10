import { GatewayManager } from "../gateway/manager/gatewayManager.ts";
import { BigString } from "../types/shared.ts";

export function calculateShardId(gateway: GatewayManager, guildId: BigString) {
  if (gateway.manager.totalShards === 1) return 0;

  return Number((BigInt(guildId) >> 22n) % BigInt(gateway.manager.totalShards));
}
