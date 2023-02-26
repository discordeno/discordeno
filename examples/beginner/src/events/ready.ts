import { Bot } from '../../bot.ts.js'
import log from '../utils/logger.ts.js'

Bot.events.ready = (_, payload) => {
  log.info(`[READY] Shard ID ${payload.shardId} of ${Bot.gateway.lastShardId + 1} shards is ready!`)

  if (payload.shardId === Bot.gateway.lastShardId) {
    botFullyReady()
  }
}

// This function lets you run custom code when all your bot's shards are online.
function botFullyReady() {
  // DO STUFF YOU WANT HERE ONCE BOT IS FULLY ONLINE.
  log.info('[READY] Bot is fully online.')
}
