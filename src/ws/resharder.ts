import { createGatewayManager, GatewayManager } from "../bot.ts";
import { GetGatewayBot } from "../types/gateway/getGatewayBot.ts";

/** The handler to automatically reshard when necessary. */
export async function resharder(oldGateway: GatewayManager) {
  oldGateway.debug("[Resharding] Checking if resharding is needed.");
  // TODO: is it possible to route this to REST?
  const results = (await fetch(`https://discord.com/api/gateway/bot`, {
    headers: { Authorization: oldGateway.token },
  }).then((res) => res.json())) as GetGatewayBot;

  const percentage = ((results.shards - oldGateway.maxShards) / oldGateway.maxShards) * 100;
  // Less than necessary% being used so do nothing
  if (percentage < oldGateway.reshardPercentage) return;

  // Don't have enough identify rate limits to reshard
  if (results.sessionStartLimit.remaining < results.shards) return;

  oldGateway.debug("[Resharding] Starting the reshard process.");

  const gateway = createGatewayManager({
    ...oldGateway,
    // IGNORE EVENTS FOR NOW
    handleDiscordPayload: async function () {},
  });

  // Begin resharding
  gateway.maxShards = results.shards;
  // FOR MANUAL SHARD CONTROL, OVERRIDE THIS SHARD ID!
  gateway.lastShardId = oldGateway.lastShardId === oldGateway.maxShards ? gateway.maxShards : oldGateway.lastShardId;
  gateway.shardsRecommended = results.shards;
  gateway.sessionStartLimitTotal = results.sessionStartLimit.total;
  gateway.sessionStartLimitRemaining = results.sessionStartLimit.remaining;
  gateway.sessionStartLimitResetAfter = results.sessionStartLimit.resetAfter;
  gateway.maxConcurrency = results.sessionStartLimit.maxConcurrency;
  // If more than 100K servers, begin switching to 16x sharding
  if (gateway.maxShards && gateway.useOptimalLargeBotSharding) {
    gateway.debug("[Resharding] Using optimal large bot sharding solution.");
    gateway.maxShards = Math.ceil(
      gateway.maxShards /
        (results.sessionStartLimit.maxConcurrency === 1 ? 16 : results.sessionStartLimit.maxConcurrency)
    );
  }

  gateway.spawnShards(gateway, gateway.firstShardId);

  return new Promise((resolve) => {
    // TIMER TO KEEP CHECKING WHEN ALL SHARDS HAVE RESHARDED
    const timer = setInterval(async () => {
      const pending = await gateway.resharderIsPending(gateway, oldGateway);
      // STILL PENDING ON SOME SHARDS TO BE CREATED
      if (pending) return;

      // ENABLE EVENTS ON NEW SHARDS AND IGNORE EVENTS ON OLD
      gateway.handleDiscordPayload = oldGateway.handleDiscordPayload;
      oldGateway.handleDiscordPayload = function () {};


      // STOP TIMER
      clearInterval(timer);
      await gateway.resharderCloseOldShards(oldGateway);
      gateway.debug("[Resharding] Complete.");
      resolve(gateway);
    }, 30000);
  }) as Promise<GatewayManager>;
}

/** Handler that by default will check all new shards are online in the new gateway. The handler can be overriden if you have multiple servers to communicate through redis pubsub or whatever you prefer. */
export async function resharderIsPending(gateway: GatewayManager, oldGateway: GatewayManager) {
  let pending = false;
  for (let i = gateway.firstShardId; i < gateway.maxShards; i++) {
    const shard = gateway.shards.get(i);
    if (!shard?.ready) {
      pending = true;
      break;
    }
  }

  return pending;
}

/** Handler that by default closes all shards in the old gateway. Can be overriden if you have multiple servers and you want to communicate through redis pubsub or whatever you prefer. */
export async function resharderCloseOldShards(oldGateway: GatewayManager) {
  // SHUT DOWN ALL SHARDS IF NOTHING IN QUEUE
  oldGateway.shards.forEach((shard) => {
    // CLOSE THIS SHARD IT HAS NO QUEUE
    if (!shard.processingQueue && !shard.queue.length) {
      return oldGateway.closeWS(shard.ws, 3066, "Shard has been resharded. Closing shard since it has no queue.");
    }

    // IF QUEUE EXISTS GIVE IT 5 MINUTES TO COMPLETE
    setTimeout(() => {
      oldGateway.closeWS(shard.ws, 3066, "Shard has been resharded. Delayed closing shard since it had a queue.");
    }, 300000);
  });
}
