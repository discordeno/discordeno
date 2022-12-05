// @ts-nocheck

import type { RestManager } from '../../restManager.js'
import type { StatusUpdate } from './editShardStatus.js'

export async function editBotStatus (
  rest: RestManager,
  data: StatusUpdate
): Promise<void> {
  await Promise.all(
    bot.gateway.manager.shards.map(async (shard) =>
      rest.helpers.editShardStatus(shard.id, data)
    )
  )
}
