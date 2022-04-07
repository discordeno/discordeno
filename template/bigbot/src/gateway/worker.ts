import { DISCORD_TOKEN, EVENT_HANDLER_PORT, EVENT_HANDLER_SECRET_KEY, EVENT_HANDLER_URL } from "../../configs.ts";
import { Collection, createGatewayManager, DiscordReady, GatewayManager, GetGatewayBot } from "../../deps.ts";

let gateway: GatewayManager;
// FOR RESHARDED
let gatewayPendingClosing: GatewayManager;
let workerId: number;

function spawnGateway(shardId: number, options: Partial<GatewayManager>) {
  console.log(`[Worker #${workerId}]`, "[Worker] Spawning the worker gateway.", shardId, options);
  gateway = createGatewayManager({
    // LOAD DATA FROM DISCORDS RECOMMENDATIONS OR YOUR OWN CUSTOM ONES HERE
    shardsRecommended: options.shardsRecommended,
    sessionStartLimitTotal: options.sessionStartLimitTotal,
    sessionStartLimitRemaining: options.sessionStartLimitRemaining,
    sessionStartLimitResetAfter: options.sessionStartLimitResetAfter,
    maxConcurrency: options.maxConcurrency,
    maxShards: options.maxShards,
    // SET STARTING SHARD ID
    firstShardId: shardId,
    // SET LAST SHARD ID
    lastShardId: options.lastShardId ?? shardId,
    // THE AUTHORIZATION WE WILL USE ON OUR EVENT HANDLER PROCESS
    secretKey: EVENT_HANDLER_SECRET_KEY,
    token: DISCORD_TOKEN,
    intents: ["GuildMessages", "Guilds", "GuildMembers"],
    handleDiscordPayload: async function (_, data, shardId) {
      // TRIGGER RAW EVENT
      if (!data.t) return;

      const id = (data.t && ["GUILD_CREATE", "GUILD_DELETE", "GUILD_UPDATE"].includes(data.t)
        ? (data.d as any)?.id
        : (data.d as any)?.guild_id) ?? "000000000000000000";

      // IF FINAL SHARD BECAME READY TRIGGER NEXT WORKER
      if (data.t === "READY") {
        console.log(`[Worker #${workerId}]`, `[Worker] Shard #${shardId} online`);

        if (shardId === gateway.lastShardId) {
          // @ts-ignore
          postMessage(
            JSON.stringify({
              type: "ALL_SHARDS_READY",
            }),
          );
        }
      }

      // DONT SEND THESE EVENTS USELESS TO BOT
      if (["GUILD_LOADED_DD"].includes(data.t)) {
        return;
      }

      await fetch(`${EVENT_HANDLER_URL}:${EVENT_HANDLER_PORT}`, {
        headers: {
          Authorization: gateway.secretKey,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          shardId,
          data,
        }),
      })
        // BELOW IS FOR DENO MEMORY LEAK
        .then((res) =>
          res.text()
        )
        .catch(() => null);
    },
  });

  // START THE GATEWAY
  gateway.spawnShards(gateway, shardId);

  return gateway;
}

interface IdentifyPayload {
  type: "IDENTIFY";
  shardId: number;
  shards: number;
  sessionStartLimit: {
    total: number;
    remaining: number;
    resetAfter: number;
    maxConcurrency: number;
  };
  shardsRecommended: number;
  sessionStartLimitTotal: number;
  sessionStartLimitRemaining: number;
  sessionStartLimitResetAfter: number;
  maxConcurrency: number;
  maxShards: number;
  lastShardId: number;
  workerId: number;
}

interface ReshardPayload {
  type: "RESHARD";
  results: GetGatewayBot;
}

interface FullyReshardedPayload {
  type: "RESHARDED-CLOSEOLD";
}

// @ts-ignore this should not be erroring
self.onmessage = async function (message: MessageEvent<string>) {
  const data = JSON.parse(message.data) as IdentifyPayload | ReshardPayload | FullyReshardedPayload;

  if (data.type === "IDENTIFY") {
    workerId = data.workerId;

    gateway = spawnGateway(data.shardId, {
      shardsRecommended: data.shardsRecommended,
      sessionStartLimitTotal: data.sessionStartLimitTotal,
      sessionStartLimitRemaining: data.sessionStartLimitRemaining,
      sessionStartLimitResetAfter: data.sessionStartLimitResetAfter,
      maxConcurrency: data.maxConcurrency,
      maxShards: data.maxShards,
      lastShardId: data.lastShardId,
      spawnShardDelay: 5000,
    });
  }

  if (data.type === "RESHARDED-CLOSEOLD") {
    console.log(`[Worker #${workerId}]`, "[Resharding] Closing old gateways.");
    await gateway.resharding.closeOldShards(gatewayPendingClosing);
  }

  if (data.type === "RESHARD") {
    console.log(`[Worker #${workerId}]`, "[Worker] Resharding the worker.");
    gateway.resharding.isPending = async function (gateway: GatewayManager) {
      for (let i = gateway.firstShardId; i < gateway.lastShardId; i++) {
        const shard = gateway.shards.get(i);
        if (!shard?.ready) {
          return true;
        }
      }

      return false;
    };

    async function processResharding(oldGateway: GatewayManager, results: GetGatewayBot) {
      oldGateway.debug("GW DEBUG", "[Resharding] Starting the reshard process.");

      const gateway = createGatewayManager({
        ...oldGateway,
        // RESET THE SETS AND COLLECTIONS
        cache: {
          guildIds: new Set(),
          loadingGuildIds: new Set(),
          editedMessages: new Collection(),
        },
        shards: new Collection(),
        loadingShards: new Collection(),
        buckets: new Collection(),
        utf8decoder: new TextDecoder(),
      });

      for (const [key, value] of Object.entries(oldGateway)) {
        if (key === "handleDiscordPayload") {
          gateway.handleDiscordPayload = async function (_, data, shardId) {
            if (data.t === "READY") {
              const payload = data.d as DiscordReady;
              console.log(`[Worker - ${workerId}] Shard #${payload.shard?.[0]} online`);
              if (shardId === gateway.lastShardId) {
                // @ts-ignore
                postMessage(
                  JSON.stringify({
                    type: "RESHARDED",
                    results,
                  }),
                );
              }

              await gateway.resharding.markNewGuildShardId(
                payload.guilds.map((g) => BigInt(g.id)),
                shardId,
              );
            }
          };
          continue;
        }

        // DON"T OVERRIDE THESE
        if (["cache", "shards", "loadingShards", "buckets", "utf8decoder"].includes(key)) continue;

        // USE ANY CUSTOMIZED OPTIONS FROM OLD GATEWAY
        // @ts-ignore silly ts error
        gateway[key] = oldGateway[key as keyof typeof oldGateway];
      }

      // Begin resharding
      // If more than 100K servers, begin switching to 16x sharding
      if (gateway.useOptimalLargeBotSharding) {
        console.log(`[Worker - ${workerId}]`, "[Resharding] Using optimal large bot sharding solution.");
        gateway.maxShards = gateway.calculateMaxShards(results.shards, results.sessionStartLimit.maxConcurrency);
      } else {
        gateway.maxShards = results.shards;
      }

      // FOR MANUAL SHARD CONTROL, OVERRIDE THIS SHARD ID!
      gateway.lastShardId = oldGateway.lastShardId === oldGateway.maxShards - 1
        ? gateway.maxShards - 1
        : oldGateway.lastShardId;
      gateway.shardsRecommended = results.shards;
      gateway.sessionStartLimitTotal = results.sessionStartLimit.total;
      gateway.sessionStartLimitRemaining = results.sessionStartLimit.remaining;
      gateway.sessionStartLimitResetAfter = results.sessionStartLimit.resetAfter;
      gateway.maxConcurrency = results.sessionStartLimit.maxConcurrency;

      gateway.spawnShards(gateway, gateway.firstShardId);

      return new Promise((resolve) => {
        // TIMER TO KEEP CHECKING WHEN ALL SHARDS HAVE RESHARDED
        const timer = setInterval(async () => {
          const pending = await gateway.resharding.isPending(gateway, oldGateway);
          // STILL PENDING ON SOME SHARDS TO BE CREATED
          if (pending) return;

          // ENABLE EVENTS ON NEW SHARDS AND IGNORE EVENTS ON OLD
          const oldHandler = oldGateway.handleDiscordPayload;
          gateway.handleDiscordPayload = oldHandler;
          oldGateway.handleDiscordPayload = function (og, data, shardId) {
            // ALLOW EXCEPTION FOR CHUNKING TO PREVENT REQUESTS FREEZING
            if (data.t !== "GUILD_MEMBERS_CHUNK") return;
            oldHandler(og, data, shardId);
          };

          // STOP TIMER
          clearInterval(timer);
          await gateway.resharding.editGuildShardIds();
          gatewayPendingClosing = oldGateway;
          gateway.debug("GW DEBUG", "[Resharding] Complete.");
          resolve(gateway);
        }, 30000);
      }) as Promise<GatewayManager>;
    }

    gateway = await processResharding(gateway, data.results);
    console.log(`[Worker - ${workerId}] Resharded the worker.`);
    // @ts-ignore this should not be erroring
    postMessage(
      JSON.stringify({
        type: "RESHARDED",
        results: data.results,
      }),
    );
  }
};
