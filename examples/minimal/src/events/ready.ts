import { bot } from '../bot.js';
import logger from '../utils/logger.js';

bot.events.ready = ({ shardId }) => {
  logger.info(`[READY] Shard ${shardId} is ready!`);

  if (shardId === bot.gateway.lastShardId) {
    botFullyReady();
  }
};

// This function lets you run custom code when all your bot's shards are online.
function botFullyReady(): void {
  // Do stuff that you want that get execute only when the bot is fully online.

  logger.info('[READY] Bot is fully online.');
}
