import { delay } from '../../util/utils.js'
import { GatewayManager } from './gatewayManager.js'

export async function stop (gateway: GatewayManager, code: number, reason: string) {
  gateway.manager.shards.forEach((shard) => shard.close(code, reason))

  await delay(5000)
}
