import { delay } from '@discordeno/utils'
import type { GatewayManager } from './gatewayManager.js'

export async function stop (
  gateway: GatewayManager,
  code: number,
  reason: string
): Promise<void> {
  gateway.manager.shards.forEach((shard) => shard.close(code, reason))

  await delay(5000)
}
