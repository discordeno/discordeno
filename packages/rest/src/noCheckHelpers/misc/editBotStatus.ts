// @ts-nocheck

import { RestManager } from '../../restManager.js'
import { StatusUpdate } from './editShardStatus.js'

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
