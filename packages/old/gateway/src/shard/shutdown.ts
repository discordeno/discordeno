import type { Shard } from './types.js'
import { ShardSocketCloseCodes, ShardState } from './types.js'

export async function shutdown (shard: Shard): Promise<void> {
  shard.close(ShardSocketCloseCodes.Shutdown, 'Shard shutting down.')
  shard.state = ShardState.Offline
}
