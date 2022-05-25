import { Collection, createGatewayManager, createRestManager, endpoints } from "../../deps.ts";
import { DISCORD_TOKEN, EVENT_HANDLER_SECRET_KEY, REST_AUTHORIZATION_KEY, REST_PORT } from "../../configs.ts";

// CREATE A SIMPLE MANAGER FOR REST
const rest = createRestManager({
  token: DISCORD_TOKEN,
  secretKey: REST_AUTHORIZATION_KEY,
  customUrl: `http://localhost:${REST_PORT}`,
});

const gateway = createGatewayManager({
  // THE AUTHORIZATION WE WILL USE ON OUR EVENT HANDLER PROCESS
  secretKey: EVENT_HANDLER_SECRET_KEY,
  token: DISCORD_TOKEN,
  intents: ["GuildMessages", "Guilds"],
  // THIS WILL BASICALLY BE YOUR HANDLER FOR YOUR EVENTS.
  handleDiscordPayload: async function (_, data, shardId) {},
});

const workers = new Collection<number, Worker>();

async function startGateway() {
  // CALL THE REST PROCESS TO GET GATEWAY DATA
  const result = await rest.runMethod(rest, "get", endpoints.GATEWAY_BOT()).then((res) => ({
    url: res.url,
    shards: res.shards,
    sessionStartLimit: {
      total: res.session_start_limit.total,
      remaining: res.session_start_limit.remaining,
      resetAfter: res.session_start_limit.reset_after,
      maxConcurrency: res.session_start_limit.max_concurrency,
    },
  }));

  // LOAD DATA FROM DISCORDS RECOMMENDATIONS OR YOUR OWN CUSTOM ONES HERE
  gateway.shardsRecommended = result.shards;
  gateway.sessionStartLimitTotal = result.sessionStartLimit.total;
  gateway.sessionStartLimitRemaining = result.sessionStartLimit.remaining;
  gateway.sessionStartLimitResetAfter = result.sessionStartLimit.resetAfter;
  gateway.maxConcurrency = result.sessionStartLimit.maxConcurrency;
  gateway.maxShards = result.shards;
  gateway.lastShardId = result.shards;

  // PREPARE BUCKETS FOR IDENTIFYING
  gateway.prepareBuckets(gateway, 0, result.shards);

  function startWorker(workerId: number, bucketId: number, firstShardId: number, lastShardId: number) {
    const worker = workers.get(workerId);
    if (!worker) return;

    // TRIGGER IDENTIFY IN WORKER
    worker.postMessage(
      JSON.stringify({
        type: "IDENTIFY",
        shardId: firstShardId,
        shardsRecommended: result.shards,
        sessionStartLimitTotal: result.sessionStartLimit.total,
        sessionStartLimitRemaining: result.sessionStartLimit.remaining,
        sessionStartLimitResetAfter: result.sessionStartLimit.resetAfter,
        maxConcurrency: result.sessionStartLimit.maxConcurrency,
        maxShards: gateway.maxShards,
        lastShardId: lastShardId,
        workerId,
      }),
    );
  }

  gateway.buckets.forEach((bucket, bucketId) => {
    for (let i = 0; i < bucket.workers.length; i++) {
      const workerId = bucket.workers[i][0];
      const worker = new Worker(
        new URL("./worker.ts", import.meta.url).href,
        {
          name: `w-${workerId}-b${bucketId}`,
          type: "module",
        },
      );
      workers.set(workerId, worker);

      if (bucket.workers[i + 1]) {
        worker.onmessage = function (message) {
          const data = JSON.parse(message.data);
          if (data.type === "ALL_SHARDS_READY") {
            const queue = bucket.workers[i + 1];
            if (queue) startWorker(queue[0], bucketId, queue[1], queue[queue.length - 1]);
          }

          if (data.type === "RESHARDED") {
            const nextWorker = workers.get(workerId + 1);
            if (nextWorker) {
              nextWorker.postMessage(
                JSON.stringify({
                  type: "RESHARD",
                  results: data.results,
                }),
              );
            }
          }
        };
      } else {
        // THIS IS FINAL WORKER
        worker.onmessage = function (message) {
          const data = JSON.parse(message.data);
          if (data.type === "RESHARDED") {
            // THERE IS NO NEXT WORKER SO TELL ALL WORKERS TO CLOSE OLD GATEWAYS
            workers.forEach((workerx) => {
              workerx.postMessage(
                JSON.stringify({
                  type: "RESHARDED-CLOSEOLD",
                }),
              );
            });
          }
        };
      }
    }

    const queue = bucket.workers[0];
    startWorker(queue[0], bucketId, queue[1], queue[queue.length - 1]);
  });
}

startGateway();

setInterval(async () => {
  console.log("GW DEBUG", "[Resharding] Checking if resharding is needed.");

  const results = await rest.runMethod(rest, "get", endpoints.GATEWAY_BOT()).then((res) => ({
    url: res.url,
    shards: res.shards,
    sessionStartLimit: {
      total: res.session_start_limit.total,
      remaining: res.session_start_limit.remaining,
      resetAfter: res.session_start_limit.reset_after,
      maxConcurrency: res.session_start_limit.max_concurrency,
    },
  }));
  const percentage = ((results.shards - gateway.maxShards) / gateway.maxShards) * 100;
  // Less than necessary% being used so do nothing
  if (percentage < gateway.reshardPercentage) return;

  // Don't have enough identify rate limits to reshard
  if (results.sessionStartLimit.remaining < results.shards) return;

  workers.first()?.postMessage(
    JSON.stringify({
      type: "RESHARD",
      results,
    }),
  );
  // DAILY
}, 1000 * 60 * 60 * 24);
