import { GatewayManager } from '../manager/gatewayManager.js'

export function calculateShardId (gateway: GatewayManager, guildId: bigint): number {
  if (gateway.manager.totalShards === 1) return 0

  return Number((guildId >> 22n) % BigInt(gateway.manager.totalShards))
}
