import { Bot } from '../../bot.js'
import { StatusUpdate } from './editShardStatus.js'

export async function editBotStatus (
  bot: Bot,
  data: StatusUpdate
): Promise<void> {
  await Promise.all(
    bot.gateway.manager.shards.map(
      async (shard) => await bot.helpers.editShardStatus(shard.id, data)
    )
  )
}
