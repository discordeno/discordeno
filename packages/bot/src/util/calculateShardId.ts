import { GatewayManager } from '../gateway/manager/gatewayManager.js'

export function calculateShardId (gateway: GatewayManager, guildId: bigint) {
  if (gateway.manager.totalShards === 1) return 0

  return Number((guildId >> 22n) % BigInt(gateway.manager.totalShards))
}
