import { Bot } from "../../bot.ts";
import log from "../utils/logger.ts";

Bot.events.ready = (_, payload) => {
  log.info(`[READY] Shard ID ${payload.shardId} of ${Bot.gateway.maxShards} shards is ready!`);

  if (payload.shardId + 1 === Bot.gateway.maxShards) {
    botFullyReady();
  }
};

// This function lets you run custom code when all your bot's shards are online.
function botFullyReady() {
  // DO STUFF YOU WANT HERE ONCE BOT IS FULLY ONLINE.
  log.info("[READY] Bot is fully online.");
}
